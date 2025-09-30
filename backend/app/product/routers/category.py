from fastapi import APIRouter, Depends, HTTPException, status
from app.account.dependency import require_admin
from app.account.models import User
from app.db.config import SessionDep
from app.product.schemas import CategoryCreate, CategoryOut
from app.product.services.category_service import (
    create_category,
    delete_category,
    get_all_categories,
)

router = APIRouter(prefix="/api/products/category", tags=["Category"])


@router.post("/", response_model=CategoryOut)
async def category_create(
    session: SessionDep,
    category: CategoryCreate,
    admin_user: User = Depends(require_admin),
):
    return await create_category(session, category)


@router.get("/", response_model=list[CategoryOut])
async def get_list_of_categories(
    session: SessionDep,
    # admin_user: User=Depends(require_admin)
):
    return await get_all_categories(session)


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def category_delete(
    session: SessionDep, category_id: int, admin_user: User = Depends(require_admin)
):
    success = await delete_category(session, category_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Category Not Found"
        )
