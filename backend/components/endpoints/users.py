from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated

from components.models.user import AuthUser, User, UserBasic, UserToCreate
from components.services import auth_service ,user_service

user = APIRouter(prefix='/users', tags=['User'])

AuthDep = Annotated[AuthUser, Depends(auth_service.get_current_user)]

@user.post("")
def create_user(user: UserToCreate):
    try:
        token = auth_service.create_user(user.username, user.password)
        user_service.create_user(user)
        return token
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@user.get("/me")
def me(auth: AuthDep) -> User:
    try:
        return user_service.get_user(auth.username)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@user.get("/{username}")
def get_user(username: str, auth: AuthDep) -> UserBasic:
    try:
        return user_service.get_user_basic(username)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
