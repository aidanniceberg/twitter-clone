from fastapi import FastAPI, HTTPException, Request

from components.models.token import Token
from components.models.users import AuthUser, User
from components.services import auth_service
from components.utils.exceptions import CredentialsException, ExistsException

app = FastAPI()

@app.post("/token")
def token(user: User):
    """
    Authenticates a given user

    :param username username to authenticate with
    :param password password to authenticate with
    :return access token
    """
    try:
        return auth_service.fetch_token(user)
    except CredentialsException as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/user")
def get_user(request: Request) -> AuthUser:
    """
    Given an access token in the header, returns user related information

    :return user related information
    """
    try:
        auth = request.headers.get('authorization', '')
        auth_split = auth.split()
        if len(auth_split) != 2 or auth_split[0].lower() != "bearer":
            raise CredentialsException("Invalid authorization type")
        token = auth_split[1]
        return auth_service.get_user(token)
    except CredentialsException as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/user")
def create_user(user: User) -> Token:
    """
    Creates a user with associated information

    :return access token
    """
    try:
        return auth_service.create_user(user)
    except ExistsException as e:
        raise HTTPException(status_code=409, detail=str(e))
    except CredentialsException as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
