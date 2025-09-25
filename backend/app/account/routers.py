from fastapi import APIRouter
from app.account.schemas import UserCreate, UserOut
from app.account.services import create_user
from app.db.config import SessionDep

router = APIRouter(prefix="/api/account", tags=["Account"])

@router.post("/register", response_model=UserOut)
async def register(session:SessionDep, user: UserCreate ):
    return await create_user(session, user)