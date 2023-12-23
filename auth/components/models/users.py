from pydantic import BaseModel

"""
Represents a user with a plaintext password
"""
class User(BaseModel):
    username: str
    password: str

"""
Represents a user with a hashed password
"""
class DBUser(BaseModel):
    username: str
    hashed_password: str

"""
Represents a user with relevant information from the access token
TODO: implement roles
"""
class AuthUser(BaseModel):
    username: str