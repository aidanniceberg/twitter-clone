from datetime import datetime
from sqlalchemy import delete, func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from typing import List

from components.models.orm.post_like import PostLikeTbl
from components.db import get_engine
from components.utils.exceptions import NotFoundException

_engine = get_engine()

def get_likes(id: int) -> List[str]:
    """
    Given a post id, gets the usernames of all users who liked the post

    :param id: post id
    :return list of usernames
    """
    try:
        with Session(_engine) as session:
            stmt = (
                select(PostLikeTbl.username)
                .where(PostLikeTbl.post_id == id)
            )
            return session.scalars(stmt).all()
    except IntegrityError as e:
        raise NotFoundException("Post or like not found: {e}")
    except Exception as e:
        raise Exception(f"An error occurred retrieving likes from the db: {e}")

def user_likes(id: int, username: str) -> bool:
    """
    Given a post id and a username, determines if that user has liked the post

    :param id: post id
    :param username user
    :return true if user has liked the post
    """
    try:
        with Session(_engine) as session:
            stmt = (
                select(func.count(PostLikeTbl.username))
                .where((PostLikeTbl.post_id == id) & (PostLikeTbl.username == username))
            )
            return session.execute(stmt).scalar() > 0
    except Exception as e:
        raise Exception(f"An error occurred retrieving likes from the db: {e}")

def create_like(id: int, username: str) -> None:
    """
    Given a post id and a username, creates a like for that user for that post

    :param id post to like
    :param username user liking the post
    """
    try:
        like = PostLikeTbl(
            post_id=id,
            username=username,
            liked_at=datetime.now(),
        )
        with Session(_engine) as session:
            session.add(like)
            session.commit()
    except Exception as e:
        raise Exception(f"An error occurred adding a like to the db: {e}")

def remove_like(id: int, username: str) -> None:
    """
    Given a post id and a username, removes a like for that user for that post

    :param id post to unlike
    :param username user unliking the post
    """
    try:
        with Session(_engine) as session:
            stmt = (
                delete(PostLikeTbl)
                .where((PostLikeTbl.post_id == id) & (PostLikeTbl.username == username))
            )
            session.execute(stmt)
            session.commit()
    except Exception as e:
        raise Exception(f"An error occurred adding a like to the db: {e}")
