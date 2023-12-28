from datetime import datetime
from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound

from components.models.post import Post, PostBasic
from components.models.orm.post import PostTbl
from components.db import get_engine

_engine = get_engine()

def create_post(post: PostBasic) -> None:
    """
    Inserts a post into the db

    :param post post to insert
    """
    try:
        post = PostTbl(
            author=post.author,
            content=post.content,
            created_at=post.created_at if post.created_at else datetime.utcnow(),
            response_to=post.response_to,
        )
        with Session(_engine) as session:
            session.add(post)
            session.commit()
    except Exception as e:
        raise Exception(f"An error occurred adding a post to the db: {e}")


def get_post_by_id(id: int, responses_valid: bool = False, responses_included: bool = True) -> Optional[Post]:
    """
    Given an id, gets a post (with responses)

    :param id post id
    :param responses_valid true if the dao should return a post if it is a response
    :param responses_included true if the dao should include post responses
    :return post or none if not found
    """
    try:
        with Session(_engine) as session:
            stmt = select(PostTbl).where(PostTbl.id == id)
            if not responses_valid:
                stmt = stmt.where(PostTbl.response_to == None)
            post = session.scalars(stmt).one()
            return Post(
                id=post.id,
                author=post.author,
                content=post.content,
                created_at=post.created_at,
                response_to=post.response_to,
                responses=get_responses(post.id) if responses_included else None,
            )
    except NoResultFound:
        return None
    except Exception as e:
        raise Exception(f"An error occurred retrieving a post from the db: {e}")


def get_responses(parent_id: int) -> List[Post]:
    """
    Given a parent id, gets a list of all responses

    :param parent_id id of post the responses are to
    :return list of posts
    """
    try:
        with Session(_engine) as session:
            stmt = select(PostTbl).where(PostTbl.response_to == parent_id)
            posts = session.scalars(stmt).all()
            return [
                Post(
                    id=post.id,
                    author=post.author,
                    content=post.content,
                    created_at=post.created_at,
                    response_to=post.response_to,
                    responses=get_responses(post.id),
                )
                for post in posts
            ]
    except Exception as e:
        raise Exception(f"An error occurred retrieving a response from the db: {e}")

def get_post_ids_by_users(usernames: Optional[List[str]] = None, posts: bool = True, responses: bool = False) -> List[int]:
    """
    Given a list of usernames, gets the ids of all posts made by that user

    :param usernames list of usernames to retrieve ids for (none if getting all posts)
    :param posts true if the ids should include posts
    :param responses true if the ids should include responses
    :return list of post ids
    """
    try:
        with Session(_engine) as session:
            stmt = select(PostTbl)
            if usernames is not None:
                stmt = stmt.filter(PostTbl.author.in_(usernames))
            if posts and not responses:
                stmt = stmt.where(PostTbl.response_to == None)
            elif responses and not posts:
                stmt = stmt.where(PostTbl.response_to != None)
            elif not posts and not responses:
                raise Exception("Posts or responses must be included")
            stmt = stmt.order_by(PostTbl.created_at.desc())
            posts = session.scalars(stmt).all()
            return [post.id for post in posts]
    except Exception as e:
        raise Exception(f"An error occurred retrieving a response from the db: {e}")
