from typing import List, Optional

from components.daos import followings_dao, post_dao
from components.models.enum.sort_by import SortBy
from components.models.post import Post, PostBasic
from components.utils.feed_builder import FeedBuilder

def create_post(post: PostBasic) -> None:
    post_dao.create_post(post)

def get_post_by_id(id: int) -> Optional[Post]:
    return post_dao.get_post_by_id(id)

def get_posts_by_user(username: str) -> List[Post]:
    posts = []
    ids = post_dao.get_post_ids_by_users([username])
    for id in ids:
        post = post_dao.get_post_by_id(id, responses_included=False)
        if post is None:
            raise Exception("Internal error occurred, incorrect post id detected")
        posts.append(post)
    return posts

def get_feed(username: str, sort: SortBy) -> List[Post]:
    followings = followings_dao.get_followings(username)
    builder = FeedBuilder(
        authors=followings,
        sort_by=sort
    )
    return builder.create()
