from fastapi import HTTPException
from app.account.models import User, RefreshToken
from datetime import timedelta, datetime, timezone
from passlib.context import CryptContext
from decouple import config
from jose import ExpiredSignatureError, JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
JWT_ACCESS_TOKEN_TIME_MIN = config("JWT_ACCESS_TOKEN_TIME_MIN", cast=int)
JWT_REFRESH_TOKEN_TIME_DAY = config("JWT_REFRESH_TOKEN_TIME_DAY", cast=int)
JWT_ALGORITHM = config("JWT_ALGORITHM")
JWT_SECRET_KEY = config("JWT_SECRET_KEY")


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_passowrd(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=JWT_ACCESS_TOKEN_TIME_MIN)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET_KEY, JWT_ALGORITHM)


async def create_tokens(session: AsyncSession, user: User):
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token_str = str(uuid.uuid4())
    expires_at = datetime.now(timezone.utc) + timedelta(days=JWT_REFRESH_TOKEN_TIME_DAY)
    refresh_token = RefreshToken(
        user_id=user.id, token=refresh_token_str, expires_at=expires_at
    )
    session.add(refresh_token)
    await session.commit()
    return {
        "access_token": access_token,
        "refresh_token": refresh_token_str,
        "token_type": "bearer",
    }


def decode_token(token: str):
    try:
        return jwt.decode(token, JWT_SECRET_KEY, algorithms=JWT_ALGORITHM)
    except ExpiredSignatureError:
        return HTTPException(status_code=401, detail="Token Has Expired")
    except JWTError:
        return HTTPException(status_code=401, detail="Invalid Token")
