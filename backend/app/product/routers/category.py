from fastapi import APIRouter, Depends, HTTPException, status
from app.account.dependency import require_admin
from app.account.models import User
from app.db.config import SessionDep
from app.product.schemas import CategoryCreate, CategoryOut
from app.product.services.category_service import create_category, get_all_categories

router = APIRouter(prefix="/api/products/category", tags=["Category"])

@router.post("/", response_model = CategoryOut)
async def category_create(session: SessionDep, 
    category: CategoryCreate, 
    admin_user: User=Depends(require_admin)
):
    return await create_category(session, category)


@router.get("/", response_model = list[CategoryOut])
async def get_list_of_categories(session: SessionDep, 
    # admin_user: User=Depends(require_admin)
):
    return await get_all_categories(session)