from fastapi import FastAPI
from starlette import status
from starlette.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from models import Body

app = FastAPI()  # noqa: pylint=invalid-name
origins = [
	"http://localhost:3000" # or add your own front-end's domain name
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def release(*,
                  body: Body,
                  chat_id: str = None):
    await proceed_release(body, chat_id)
    return Response(status_code=status.HTTP_200_OK)