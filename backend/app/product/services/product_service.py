from typing import Optional
from fastapi import UploadFile, HTTPException, status
from sqlalchemy import select, func, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.product.models import Product, Category
from app.product.schemas import ProductCreate, ProductOut, ProductUpdate
from app.product.utils.product_utils import generate_slug, save_upload_file


async def create_product(
    session: AsyncSession, data: ProductCreate, image_url: UploadFile | None = None
) -> Product:
    if data.stock_quantity < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Stock Quantity Cannot Be Negative",
        )
    image_path = await save_upload_file(image_url, "images")
    categories = []
    if data.category_ids:
        category_stmt = select(Category).where(Category.id.in_(data.category_ids))
        category_result = await session.execute(category_stmt)
        categories = category_result.scalars().all()
    product_dict = data.model_dump(exclude={"category_ids"})
    if not product_dict.get("slug"):
        product_dict["slug"] = generate_slug(product_dict.get("title"))
    new_product = Product(**product_dict, image_url=image_path, categories=categories)
    session.add(new_product)
    await session.commit()
    return new_product


async def get_all_products(
    session: AsyncSession,
    category_names: list[str] | None = None,
    limit: int = 5,
    page: int = 1,
) -> dict:
    stmt = select(Product).options(selectinload(Product.categories))
    if category_names:
        stmt = (
            stmt.join(Product.categories)
            .where(Category.name.in_(category_names))
            .distinct()
        )
    count_stmt = stmt.with_only_columns(func.count(Product.id)).order_by(None)
    total = await session.scalar(count_stmt)
    stmt = stmt.limit(limit).offset((page - 1) * limit)

    result = await session.execute(stmt)
    products = result.scalars().all()
    return {"total": total, "page": page, "limit": limit, "items": products}


async def search_product_based_on_filters(
    session: AsyncSession,
    category_names: list[str] | None = None,
    title: str | None = None,
    description: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    limit: int = 5,
    page: int = 1,
) -> dict:

    stmt = select(Product).options(selectinload(Product.categories))
    if category_names:
        stmt = (
            stmt.join(Product.categories)
            .where(Category.name.in_(category_names))
            .distinct()
        )
    filters = []
    if title:
        filters.append(Product.title.like(f"%{title}%"))
    if description:
        filters.append(Product.description.like(f"%{description}%"))
    if min_price is not None:
        filters.append(Product.price >= min_price)
    if max_price is not None:
        filters.append(Product.price <= max_price)
    if filters:
        stmt = stmt.where(and_(*filters))

    count_stmt = stmt.with_only_columns(func.count(Product.id)).order_by(None)
    total = await session.scalar(count_stmt)
    stmt = stmt.limit(limit).offset((page - 1) * limit)

    result = await session.execute(stmt)
    products = result.scalars().all()
    return {"total": total, "page": page, "limit": limit, "items": products}


# search using slug is very SEO friendly
async def get_product_by_slug(session: AsyncSession, slug: str) -> ProductOut | None:
    stmt = (
        select(Product)
        .options(selectinload(Product.categories))
        .where(Product.slug == slug)
    )
    result = await session.execute(stmt)
    return result.scalar()


async def update_product_by_id(
    session: AsyncSession,
    product_id: int,
    data: ProductUpdate,
    image_url: Optional[UploadFile] = None,
) -> ProductOut:
    stmt = (
        select(Product)
        .options(selectinload(Product.categories))
        .where(Product.id == product_id)
    )
    result = await session.execute(stmt)
    product = result.scalar_one_or_none()

    if not product:
        return None
    if data.category_ids is not None:
        category_stmt = select(Category).where(Category.id.in_(data.category_ids))
        category_result = await session.execute(category_stmt)
        product.categories = category_result.scalars().all()

    for key, value in data.model_dump(
        exclude={"category_id"}, exclude_none=True
    ).items():
        setattr(product, key, value)

    if image_url is not None:
        image_path = await save_upload_file(image_url, "images")
        product.image_url = image_path
    await session.commit()
    await session.refresh(product)
    return product
