from fastapi import FastAPI

from components.endpoints.users import user

app = FastAPI()

# include routers
app.include_router(user)
