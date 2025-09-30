from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.product.models import Product, Category
from app.product.schemas import CategoryCreate, CategoryOut

async def create_category(sessiom: AsyncSession, category: CategoryCreate)-> CategoryOut:
    category = Category(name=category.name)
    sessiom.add(category)
    await sessiom.commit()
    await sessiom.refresh(category)
    return category

async def get_all_categories(session: AsyncSession) -> list[CategoryOut]:
    stmt = select(Category)
    result = await session.execute(stmt)
    return result.scalars().all()

async def delete_category(session: AsyncSession, category_id: int)->bool:
    category = await session.get(Category, category_id)
    if not category:
        return False
    await session.delete(category)
    await session.commit()
    return True
