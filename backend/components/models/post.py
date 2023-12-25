from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel

"""
Represents a basic post (incoming from a request)
"""
class PostBasic(BaseModel):
    id: Optional[int] = None
    author: str
    content: str
    created_at: Optional[datetime] = None
    response_to: Optional[int] = None


"""
Represents a post
"""
class Post(BaseModel):
    id: int
    author: str
    content: str
    created_at: Optional[datetime] = None
    response_to: Optional[int] = None
    responses: Optional[List["Post"]] = None
