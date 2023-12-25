from fastapi import Request, HTTPException, Response

from components.utils.exceptions import CredentialsException
from components.models.user import AuthUser
from components.clients import auth_client


def get_current_user(request: Request) -> AuthUser:
    """
    Given a request, gets the current user's information

    :param request: incoming request
    :return AuthUser
    """
    try:
        return auth_client.get_current_user(request.headers)
    except CredentialsException as e:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred getting the current user: {e}")

def create_user(username: str, password: str):
    """
    Given a username and password, creates a user

    :return access token
    """
    return auth_client.create_user(username, password)
