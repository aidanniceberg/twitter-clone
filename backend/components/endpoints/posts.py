from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, List

from components.models.post import Post, PostBasic
from components.models.user import AuthUser, UserBasic
from components.services import auth_service, like_service, post_service
from components.utils.exceptions import NotFoundException

post = APIRouter(prefix='/posts', tags=['Post'])

AuthDep = Annotated[AuthUser, Depends(auth_service.get_current_user)]

@post.post("")
def create_post(post: PostBasic, auth: AuthDep) -> None:
    if post.author != auth.username:
        raise HTTPException(status_code=403, detail="Cannot create post for this user")
    try:
        return post_service.create_post(post)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@post.get("/{id}")
def get_post_by_id(id: int, auth: AuthDep) -> Post:
    try:
        post = post_service.get_post_by_id(id)
        if post is None:
            raise NotFoundException("Post not found")
        return post
    except NotFoundException as nfe:
        raise HTTPException(status_code=404, detail=str(nfe))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@post.get("/{id}/likes")
def get_likes(id: int, auth: AuthDep) -> List[UserBasic]:
    try:
        return like_service.get_likes(id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@post.get("/{id}/likes/{username}")
def user_likes(id: int, username: str, auth: AuthDep) -> bool:
    try:
        return like_service.user_likes(id, username)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@post.post("/{id}/likes")
def like(id: int, auth: AuthDep) -> None:
    try:
        like_service.create_like(id, auth.username)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@post.delete("/{id}/likes")
def unlike(id: int, auth: AuthDep) -> None:
    try:
        like_service.remove_like(id, auth.username)
    except NotFoundException as nfe:
        raise HTTPException(status_code=404, detail=str(nfe))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

