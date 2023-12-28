from typing import List

from components.daos import followings_dao, user_dao
from components.models.user import User, UserBasic

def get_user(username: str) -> User:
    return user_dao.get_user(username)

def search_users(query: str) -> List[UserBasic]:
    return user_dao.search_users(query)

def get_user_basic(username: str) -> UserBasic:
    user = user_dao.get_user(username)
    return user.to_basic() if user else None

def create_user(user: User) -> None:
    user_dao.create_user(user)

def get_followers(username: str) -> List[UserBasic]:
    follower_usernames = followings_dao.get_followers(username)
    return user_dao.get_users(follower_usernames)

def get_followings(username: str) -> List[UserBasic]:
    following_usernames = followings_dao.get_followings(username)
    return user_dao.get_users(following_usernames)

def user_follows(username: str, followee: str) -> bool:
    return followings_dao.user_follows(username, followee)

def add_following(follower: str, followee: str) -> None:
    return followings_dao.add_following(follower, followee)

def remove_following(follower: str, followee: str) -> None:
    return followings_dao.remove_following(follower, followee)
