from typing import List

from components.daos import like_dao, user_dao
from components.models.user import UserBasic


def get_likes(id: int) -> List[UserBasic]:
     users = like_dao.get_likes(id)
     return user_dao.get_users(users)

def user_likes(id: int, username: str) -> bool:
     return like_dao.user_likes(id, username)

def create_like(id: int, username: str) -> None:
     return like_dao.create_like(id, username)

def remove_like(id: int, username: str) -> None:
     return like_dao.remove_like(id, username)
