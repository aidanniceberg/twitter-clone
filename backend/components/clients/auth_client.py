from typing import Optional
import requests

from components.utils.exceptions import CredentialsException
from components.models.user import AuthUser
from components.constants import AUTH_BASE_URL

def get_current_user(headers: Optional[dict] = None) -> AuthUser:
    """
    Hits the /user auth endpoint to get the current user (given the access token in the header)

    :param headers: headers including access token
    :return AuthUser
    """
    try:
        url = AUTH_BASE_URL + "/user"
        response = requests.get(url, headers=headers)
        if response.ok:
            return AuthUser(**response.json())
        if response.status_code == 401:
            raise CredentialsException("Invalid token")
    except CredentialsException as e:
        raise e
    except Exception as e:
        raise Exception(f"An error occurred retrieving the current user: {e}")

def create_user(username: str, password: str) -> None:
    """
    Hits the /user POST endpoint to create a new user

    :param username username to add
    :param password password to add
    """
    try:
        url = AUTH_BASE_URL + "/user"
        data = {"username": username, "password": password}
        response = requests.post(url, json=data)
        if not response.ok:
            raise Exception(response.text)
        return response.json()
    except Exception as e:
        raise Exception(f"An error occurred creating the current user: {e}")
