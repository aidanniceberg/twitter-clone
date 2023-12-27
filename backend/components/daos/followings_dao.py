from datetime import datetime
from sqlalchemy import delete, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from typing import List

from components.models.orm.followings import FollowingsTbl
from components.db import get_engine

_engine = get_engine()

def get_followers(username: str) -> List[str]:
    """
    Gets all of a given user's followers (sorted by the time they were followed)

    :param username: username associated with the user
    :return list of usernames
    """
    try:
        with Session(_engine) as session:
            stmt = (
                select(FollowingsTbl)
                .where(FollowingsTbl.followee == username)
                .order_by(FollowingsTbl.followed_at)
            )
            results = session.scalars(stmt).all()
            return [result.follower for result in results]
    except Exception as e:
        raise Exception(f"An error occurred retrieving followers from the db: {e}")


def get_followings(username: str) -> List[str]:
    """
    Gets all of a given user's followings (sorted by the time they followed)

    :param username: username associated with the user
    :return list of usernames
    """
    try:
        with Session(_engine) as session:
            stmt = (
                select(FollowingsTbl)
                .where(FollowingsTbl.follower == username)
                .order_by(FollowingsTbl.followed_at)
            )
            results = session.scalars(stmt).all()
            return [result.followee for result in results]
    except Exception as e:
        raise Exception(f"An error occurred retrieving followings from the db: {e}")

def user_follows(username: str, followee: str) -> bool:
    """
    Given a username and a followee, determines if [username] follows [followee]

    :param username: follower
    :param followee
    :return true if user follows
    """
    try:
        with Session(_engine) as session:
            stmt = (
                select(FollowingsTbl)
                .where((FollowingsTbl.follower == username) & (FollowingsTbl.followee == followee))
            )
            return len(session.scalars(stmt).all()) > 0
    except Exception as e:
        raise Exception(f"An error occurred retrieving followings from the db: {e}")

def add_following(follower: str, followee: str) -> None:
    """
    Given a follower and followee, adds an entry in the db

    :param follower person following the other
    :param followee person being followed
    """
    try:
        entry = FollowingsTbl(
            follower=follower,
            followee=followee,
            followed_at=datetime.utcnow()
        )
        with Session(_engine) as session:
            session.add(entry)
            session.commit()
    except IntegrityError:
        raise Exception("At least one of the provided usernames does not exist")
    except Exception as e:
        raise Exception(f"An error occurred inserting followings to the db: {e}")

def remove_following(follower: str, followee: str) -> None:
    """
    Given a follower and followee, removes the entry in the db

    :param follower person following the other
    :param followee person being followed
    """
    try:
        with Session(_engine) as session:
            stmt = (
                delete(FollowingsTbl)
                .where((FollowingsTbl.follower == follower) & (FollowingsTbl.followee == followee))
            )
            session.execute(stmt)
            session.commit()
    except Exception as e:
        raise Exception(f"An error occurred removing following from the db: {e}")
