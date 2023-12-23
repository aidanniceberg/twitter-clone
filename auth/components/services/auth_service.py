from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

from components.daos import auth_dao
from components.models.token import Token
from components.models.users import AuthUser, DBUser, User
from components.utils.exceptions import CredentialsException, ExistsException

ACCESS_TOKEN_EXP = 30
ALGORITHM = "HS256"
ENCRYPTION_KEY = "75f078f269bf0f707fdb757ec6c35d756608745e2332752f3b291ccb78f3c35e"

_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _create_access_token(username: str, exp: int = 10) -> str:
    """
    Given a username and expiration time, creates an access token

    :param username: user to create token for
    :param exp: number of minutes the token should stay valid for
    :return access token
    """
    expires_at = datetime.utcnow() + timedelta(minutes=exp)
    data = {"sub": username, "exp": expires_at}
    return jwt.encode(data, ENCRYPTION_KEY, algorithm=ALGORITHM)

def fetch_token(user: User) -> Token:
    """
    Fetches an access token for a given user

    :param user: user to authenticate
    :return access token
    :except CredentialsException if an authentication error occurs
    """
    db_user = auth_dao.get_user_by_username(user.username)
    if db_user is None:
        raise CredentialsException("Username does not exist")
    if not _pwd_context.verify(user.password, db_user.hashed_password):
        raise CredentialsException("Invalid password")
    access_token = _create_access_token(username=user.username, exp=ACCESS_TOKEN_EXP)
    return Token(access_token=access_token, token_type="bearer")

def get_user(token: str) -> AuthUser:
    """
    Given an access token, determines if it is valid and returns user's information

    :param token access token
    :return user related information associated with the token
    """
    try:
        payload = jwt.decode(token, ENCRYPTION_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        exp = payload.get("exp")
        if not (username or auth_dao.get_user_by_username(username)):
            raise CredentialsException("Invalid username")
        if not (exp or datetime.fromtimestamp(exp) < datetime.now()):
            raise CredentialsException("Token is expired")
        return AuthUser(username=username)
    except CredentialsException as e:
        raise e
    except JWTError:
        raise CredentialsException("Failed to decode token")
    except Exception as e:
        raise Exception(f"An error occurred validating the access token: {e}")

def create_user(user: User) -> Token:
    """
    Creates a new user

    :return access token
    """
    if auth_dao.get_user_by_username(user.username):
        raise ExistsException("User already exists")
    hashed_password = _pwd_context.hash(user.password)
    user_to_insert = DBUser(
        username=user.username,
        hashed_password=hashed_password
    )
    auth_dao.insert_user(user_to_insert)
    return fetch_token(user)
