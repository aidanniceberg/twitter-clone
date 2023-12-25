from typing import List, Optional

from components.daos import post_dao
from components.models.enum.sort_by import SortBy
from components.models.post import Post

"""
Utility class that builds a user's feed
"""
class FeedBuilder:
    def __init__(self, authors: Optional[List[str]] = None, sort_by: SortBy = SortBy.MOST_RECENT):
        self.authors = authors
        self.sort_by = sort_by
    
    def create(self) -> List[Post]:
        posts = self._aggregate()
        self._sort(posts)
        return posts
    
    def _sort(self, posts: List[Post]) -> List[Post]:
        if self.sort_by == SortBy.MOST_RECENT:
            self._sort_by_most_recent(posts)
        return posts
    
    def _sort_by_most_recent(self, posts: List[Post]) -> None:
        posts.sort(reverse = True, key = lambda p : p.created_at)
    
    def _aggregate(self) -> List[Post]:
        """
        Retrieves posts
        """
        posts = []
        for id in post_dao.get_post_ids_by_users(self.authors):
            post = post_dao.get_post_by_id(id, responses_included=False)
            if post is None:
                raise Exception("Internal error occurred, incorrect post id detected")
            posts.append(post)
        return posts
