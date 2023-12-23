from sqlalchemy import insert, select
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound
from typing import Optional

from components.models.orm_models import UserTbl
from components.models.users import DBUser
from components.db import get_engine

_engine = get_engine()

def get_user_by_username(username: str) -> Optional[DBUser]:
    """
    Gets a user from the auth db based on a username

    :param username: username associated with the user
    :return AuthUser if exists, else None
    """
    try:
        with Session(_engine) as session:
            stmt = select(UserTbl).where(UserTbl.username == username)
            user = session.scalars(stmt).one()
            return DBUser(
                username=user.username,
                hashed_password=user.pw,
            )
    except NoResultFound:
        return None
    except Exception as e:
        raise Exception(f"An error occurred retrieving a user from the db: {e}")


def insert_user(user: DBUser) -> None:
    """
    Inserts a user into the db

    :param user: user to insert
    """
    try:
        with Session(_engine) as session:
            stmt = insert(UserTbl).values(
                username=user.username,
                pw=user.hashed_password,
            )
            session.execute(stmt)
            session.commit()
    except Exception as e:
        raise Exception(f"An error occurred inserting a user to the db: {e}")