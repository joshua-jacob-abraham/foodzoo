# main.py
from fastapi import FastAPI
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
import models  # Import models so they are registered with Base
from routes import router

app = FastAPI(title="Food Delivery API")

# Create all tables in the database
Base.metadata.create_all(bind=engine)

# Include the API routes
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def root():
    return {"message": "Welcome to the Food Delivery API"}
