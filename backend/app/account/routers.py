from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse
from app.account.schemas import UserCreate, UserLogin, UserOut
from app.account.services import create_user, authenticate_user
from app.db.config import SessionDep
from app.account.utils import create_tokens, verify_refresh_token
from app.account.models import User
from app.account.dependency import get_current_user

router = APIRouter(prefix="/api/account", tags=["Account"])


@router.post("/register", response_model=UserOut)
async def register(session: SessionDep, user: UserCreate):
    return await create_user(session, user)


@router.post("/login")
async def login(session: SessionDep, user_login: UserLogin):
    user = await authenticate_user(session, user_login)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials"
        )
    tokens = await create_tokens(session, user)
    response = JSONResponse(content={"message": "Login Successful"})
    response.set_cookie(
        "access_token",
        value=tokens["access_token"],
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=60 * 60 * 24 * 1,
    )
    response.set_cookie(
        "refresh_token",
        value=tokens["refresh_token"],
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=60 * 60 * 24 * 7,
    )
    return response


@router.get("/profile", response_model=UserOut)
async def get_user_details(user: User = Depends(get_current_user)):
    return user

@router.post("/refresh")
async def get_refresh_token(session: SessionDep, request: Request):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing Refresh Token"
        )
    user = await verify_refresh_token(session, token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or Expires Token",
        )
    tokens = await create_tokens(session, user)
    response = JSONResponse(content={"message":"Token refreshed successfully"})
    response.set_cookie(
        "access_token",
        value=tokens["access_token"],
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=60 * 60 * 24 * 1,
    )
    # response.set_cookie(
    #     "refresh_token",
    #     value=tokens["refresh_token"],
    #     httponly=True,
    #     secure=True,
    #     samesite="lax",
    #     max_age=60 * 60 * 24 * 7,
    # )
    return response

    pass