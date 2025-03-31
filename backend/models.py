from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Restaurant(Base):
    __tablename__ = "restaurants"
    restaurantName = Column(String(50), primary_key=True)
    approved = Column(Boolean)

class Menu(Base):
    __tablename__ = "menu"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False) 
    price = Column(Integer, nullable=False) 
    description = Column(String(255), nullable=True)
    image = Column(String(255))
    restaurantName = Column(String(50), ForeignKey("restaurants.restaurantName"), nullable=False)

class Users(Base):
    __tablename__ = "users"
    username = Column(String(50), primary_key=True)
    password = Column(String(20)) 

class Transactions(Base):
    __tablename__ = "transactions"
    order_id = Column(String(20), primary_key=True)
    username = Column(String(50), ForeignKey("users.username"))
    restaurant_name = Column(String(50), ForeignKey("restaurants.restaurantName"))
    amount = Column(Integer)
    time = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(Boolean)

class Orders(Base):
    __tablename__ = "orders"
    order_id = Column(String(20), primary_key=True)
    receiver = Column(String(20))
    address = Column(String(100))
    phone = Column(String(12))
    assigned = Column(Integer, default = 0)
    status = Column(Boolean, default=False)

class Riders(Base):
    __tablename__ = "riders"
    id = Column(Integer, primary_key=True, autoincrement=True)
    restaurantName = Column(String(50))
    assigned = Column(Boolean, default=False)
