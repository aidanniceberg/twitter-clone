from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel

"""
Represents a user with relevant information from the access token
"""
class AuthUser(BaseModel):
    username: str

"""
Represents the basic information of a user
Withholds sensitive info like email, used when user x looks up user y
"""
class UserBasic(BaseModel):
    username: str
    bio: str = ""
    first_name: str
    last_name: str
    created_at: datetime
    followers: Optional[int] = None
    following: Optional[int] = None

"""
Represents a user
"""
class User(BaseModel):
    username: str
    email: str
    birthday: date
    bio: str = ""
    first_name: str
    last_name: str
    created_at: datetime
    followers: Optional[int] = None
    following: Optional[int] = None

    def to_basic(self) -> UserBasic:
        return UserBasic(
            username=self.username,
            bio=self.bio,
            first_name=self.first_name,
            last_name=self.last_name,
            created_at=self.created_at,
            followers=self.followers,
            following=self.following,
        )

"""
Represents a user with information needed to create it
"""
class UserToCreate(BaseModel):
    username: str
    password: Optional[str] = None
    email: str
    birthday: date
    bio: str = ""
    first_name: str
    last_name: str
    created_at: datetime
