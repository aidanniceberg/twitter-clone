from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from components.endpoints.posts import post
from components.endpoints.users import user

ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routers
app.include_router(user)
app.include_router(post)
