from fastapi import FastAPI

from components.endpoints.test import test

app = FastAPI()

# include routers
app.include_router(test)
