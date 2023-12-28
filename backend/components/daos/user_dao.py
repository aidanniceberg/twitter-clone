from sqlalchemy import func, select
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import NoResultFound
from typing import List, Optional

from components.models.user import User, UserBasic
from components.models.orm.followings import FollowingsTbl
from components.models.orm.user import UserTbl
from components.db import get_engine

_engine = get_engine()

def get_users(usernames: List[str]) -> List[UserBasic]:
    """
    Gets users from the db based on a list of usernames

    :param usernames list of usernames to retrieve
    :return list of users
    """
    try:
        with Session(_engine) as session:
            stmt = select(UserTbl).filter(UserTbl.username.in_(usernames))
            users = session.scalars(stmt).all()
            return [UserBasic(
                username=user.username,
                bio=user.bio,
                first_name=user.first_name,
                last_name=user.last_name,
                created_at=user.created_at,
                followers=_follower_count(user.username),
                following=_following_count(user.username),
            ) for user in users]
    except Exception as e:
        raise Exception(f"An error occurred retrieving a user from the db: {e}")


def search_users(query: str) -> List[UserBasic]:
    """
    Gets users from the db based on search query

    :param query string prefix to match to names
    :return list of users
    """
    try:
        with Session(_engine) as session:
            stmt = (
                select(UserTbl)
                .where(
                    (UserTbl.username.ilike(f"{query}%")) |
                    (UserTbl.last_name.ilike(f"{query}%")) |
                    (func.concat(UserTbl.first_name, ' ', UserTbl.last_name).ilike(f"{query}%"))
                )
            )
            users = session.scalars(stmt).all()
            return [UserBasic(
                username=user.username,
                bio=user.bio,
                first_name=user.first_name,
                last_name=user.last_name,
                created_at=user.created_at,
                followers=_follower_count(user.username),
                following=_following_count(user.username),
            ) for user in users]
    except Exception as e:
        raise Exception(f"An error occurred retrieving a user from the db: {e}")


def get_user(username: str) -> Optional[User]:
    """
    Gets a user from the db based on a username

    :param username: username associated with the user
    :return User if exists, else None
    """
    try:
        with Session(_engine) as session:
            stmt = select(UserTbl).where(UserTbl.username == username)
            user = session.scalars(stmt).one()
            return User(
                username=user.username,
                email=user.email,
                birthday=user.birthday,
                bio=user.bio,
                first_name=user.first_name,
                last_name=user.last_name,
                created_at=user.created_at,
                followers=_follower_count(username),
                following=_following_count(username),
            )
    except NoResultFound:
        return None
    except Exception as e:
        raise Exception(f"An error occurred retrieving a user from the db: {e}")

def _follower_count(username: str) -> int:
    """
    Given a username, counts their followers

    :param username
    :return follower count
    """
    try:
        with Session(_engine) as session:
            stmt = select(FollowingsTbl).where(FollowingsTbl.followee == username)
            return len(session.scalars(stmt).all())
    except Exception as e:
        raise Exception(f"An error occurred retrieving follower count: {e}")

def _following_count(username: str) -> int:
    """
    Given a username, counts their followings

    :param username
    :return following count
    """
    try:
        with Session(_engine) as session:
            stmt = select(FollowingsTbl).where(FollowingsTbl.follower == username)
            return len(session.scalars(stmt).all())
    except Exception as e:
        raise Exception(f"An error occurred retrieving following count: {e}")

def create_user(user: User) -> None:
    """
    Inserts a user into the db

    :param user user to insert
    """
    try:
        user = UserTbl(
            username=user.username,
            email=user.email,
            birthday=user.birthday,
            bio=user.bio,
            first_name=user.first_name,
            last_name=user.last_name,
            created_at=user.created_at,
        )
        with Session(_engine) as session:
            session.add(user)
            session.commit()
    except IntegrityError:
        raise Exception(f"Cannot create user, username already exists")
    except Exception as e:
        raise Exception(f"An error occurred retrieving a user from the db: {e}")
