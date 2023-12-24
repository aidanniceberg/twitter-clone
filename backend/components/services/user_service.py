from components.daos import user_dao
from components.models.user import User, UserBasic

def get_user(username: str) -> User:
    return user_dao.get_user(username)

def get_user_basic(username: str) -> UserBasic:
    user = user_dao.get_user(username)
    return user.to_basic() if user else None

def create_user(user: User) -> None:
    user_dao.create_user(user)
