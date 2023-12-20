from fastapi import APIRouter

test = APIRouter(prefix='/test', tags=['Test'])

@test.get("/")
def read_root():
    return "Hello, world!"
