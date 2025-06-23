from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.routers import analyze

app = FastAPI()
@app.get("/")
def read_root():
    return {"message": "Carbon Footprint API is running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router, prefix="/api")
