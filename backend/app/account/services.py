from app.account.models import User, RefreshToken
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from app.account.schemas import UserCreate, UserLogin
from app.account.utils import hash_password, verify_passowrd


async def create_user(session: AsyncSession, user: UserCreate):
    stmt = select(User).where(User.email == user.email)
    result = await session.scalars(stmt)
    if result.first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email Already Register"
        )
    new_user = User(email=user.email, hashed_password=hash_password(user.password))
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    return new_user


async def authenticate_user(session: AsyncSession, user_login: UserLogin):
    stmt = select(User).where(User.email == user_login.email)
    result = await session.scalars(stmt)
    user = result.first()
    if not user or not verify_passowrd(user_login.password, user.hashed_password):
        return None
    return user
