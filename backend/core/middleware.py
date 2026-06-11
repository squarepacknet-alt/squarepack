import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Configure CORS
raw_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:3001,https://squarepack-sigma.vercel.app",
)
# Strip whitespace AND trailing slashes from each origin
allowed_origins = [
    origin.strip().rstrip("/") for origin in raw_origins.split(",") if origin.strip()
]


def register_middleware(app: FastAPI):

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # We will configure allowed origin later. @Codexter
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
