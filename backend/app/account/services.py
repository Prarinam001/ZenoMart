from app.account.models import User, RefreshToken
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import Depends, HTTPException, status
from app.account.schemas import PasswordChangeRequest, UserCreate, UserLogin
from app.account.utils import (
    create_email_verification_token,
    hash_password,
    verify_email_token_and_get_user_id,
    verify_passowrd,
)
from app.account.dependency import get_current_user


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


async def email_verification_send(user: User):
    token = create_email_verification_token(user.id)
    link = f"http://localhost:8000/account/verify?token={token}"
    print(f"verify your email link: {link}")
    return {"msg": "Verification email send"}


async def verify_email_token(session: AsyncSession, token: str):
    user_id = verify_email_token_and_get_user_id(token, "verify_email")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or Expires Token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    stmt = select(User).where(User.id == user_id)
    result = await session.scalars(stmt)
    user = result.first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User Not Found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user.is_verified = True
    session.add(user)
    await session.commit()
    return {"message": "Email verification was done"}


async def change_password(
    session: AsyncSession, user: User, data: PasswordChangeRequest
):
    if not verify_passowrd(data.old_password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Old password is incorrect"
        )
    user.hashed_password = hash_password(data.new_password)
    session.add(user)
    await session.commit()
    return user
