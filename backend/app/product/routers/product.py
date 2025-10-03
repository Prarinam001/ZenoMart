from typing import Annotated
from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    Form,
    HTTPException,
    status,
    Query,
)
from app.account.models import User
from app.db.config import SessionDep
from app.product.schemas import PaginatedProductOut, ProductCreate, ProductOut
from app.account.dependency import require_admin
from app.product.services.product_service import create_product, get_all_products

router = APIRouter(prefix="/api/products", tags=["Product"])


@router.post("/", response_model=ProductOut)
async def product_create(
    session: SessionDep,
    title: str = Form(...),
    description: str | None = Form(None),
    price: float = Form(...),
    stock_quantity: int = Form(...),
    category_ids: Annotated[list[int], Form(...)] = [],
    image: UploadFile | None = File(None),
    admin_user: User = Depends(require_admin),
):
    data = ProductCreate(
        title=title,
        description=description,
        price=price,
        stock_quantity=stock_quantity,
        category_ids=category_ids,
    )
    return await create_product(session, data, image)


@router.get("/", response_model=PaginatedProductOut)
async def list_product(
    session: SessionDep,
    categories: list[str] | None = Query(default=None),
    limit:int = Query(default=5, ge=1, le=100),
    page: int = Query(default=1, ge=1),
):
    return await get_all_products(session, categories, limit, page)
