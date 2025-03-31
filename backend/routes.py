# routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid
from crud import get_all_foods, get_foods_from_restaurant, create_order, assign_rider, mark_order_delivered, authenticate_user, create_user
from database import get_db
from pymodels import MenuSchema, UserCreate, CheckoutInput

router = APIRouter()

# Endpoint to get all foods
@router.get("/foods", response_model=list[MenuSchema])
def show_all_foods(db: Session = Depends(get_db)):
    return get_all_foods(db)

# Checkout endpoint to create order, mark as paid, assign rider, and simulate delivery
@router.post("/checkout")
def checkout(checkout_data: CheckoutInput, db: Session = Depends(get_db)):
    order_id = str(uuid.uuid4())[:8]  
    create_order(db, checkout_data.username, checkout_data.restaurantName, checkout_data.amount, checkout_data.receiver, checkout_data.address, checkout_data.phone, order_id)
    rider = assign_rider(db, checkout_data.restaurantName,order_id)
    mark_order_delivered(db, order_id)
    return {"order_id": order_id, "rider_assigned": rider is not None}

# Login endpoint
@router.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful"}

# Registration endpoint
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if create_user(db, user.username, user.password) is None:
        raise HTTPException(status_code=400, detail="User already exists")
    return {"message": "User registered successfully"}
