from fastapi import APIRouter, Body, Depends, HTTPException
from typing import Annotated, List

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

@user.get("/{username}/followers")
def get_followers(username: str, auth: AuthDep) -> List[UserBasic]:
    try:
        return user_service.get_followers(username)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@user.get("/{username}/following")
def get_followings(username: str, auth: AuthDep) -> List[UserBasic]:
    try:
        return user_service.get_followings(username)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@user.post("/{username}/following")
def follow(username: str, followee: Annotated[str, Body()], auth: AuthDep) -> None:
    if username != auth.username:
        raise HTTPException(status_code=403, detail="Cannot change follower info for this user")
    try:
        return user_service.add_following(username, followee)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@user.delete("/{username}/following")
def unfollow(username: str, followee: Annotated[str, Body()], auth: AuthDep) -> None:
    if username != auth.username:
        raise HTTPException(status_code=403, detail="Cannot change follower info for this user")
    try:
        return user_service.remove_following(username, followee)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
