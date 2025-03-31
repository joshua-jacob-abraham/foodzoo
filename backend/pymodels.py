# pymodels.py
from pydantic import BaseModel
from typing import Optional
import datetime

class RestaurantSchema(BaseModel):
    restaurantName: str
    approved: Optional[bool] = False

    class Config:
        orm_mode = True

class MenuSchema(BaseModel):
    id: int
    name: str
    price: int
    description: Optional[str] = None
    image : str
    restaurantName: str

    class Config:
        orm_mode = True

class UserSchema(BaseModel):
    username: str
    password: str

    class Config:
        orm_mode = True

# For incoming registration/login requests
class UserCreate(BaseModel):
    username: str
    password: str

class TransactionSchema(BaseModel):
    order_id: str
    username: str
    restaurantName: str
    amount: int
    time: datetime.datetime
    status: bool

    class Config:
        orm_mode = True

class OrderSchema(BaseModel):
    order_id: str
    receiver: str
    address: str
    phone: str
    assigned: bool
    status: bool

    class Config:
        orm_mode = True

class RiderSchema(BaseModel):
    id: str
    restaurantName : str
    assigned: bool

    class Config:
        orm_mode = True

# For checkout endpoint input
class CheckoutInput(BaseModel):
    username: str
    restaurantName: str
    amount: int
    receiver: str
    address: str
    phone: str
