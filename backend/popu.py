from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base
from models import Restaurant, Menu, Riders

# Database connection
DATABASE_URL = "mysql+mysqlconnector://root:Lepaku%402027@localhost:3306/FOODZOO"

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

Base.metadata.create_all(engine)

restaurants = [
    {"restaurantName": "Pizza Palace", "approved": True},
    {"restaurantName": "Burger Haven", "approved": True},
    {"restaurantName": "Sushi World", "approved": True},
    {"restaurantName": "Tandoori Corner", "approved": True},
    {"restaurantName": "Pasta Delight", "approved": True},
    {"restaurantName": "Vegan Bites", "approved": True},
]

for rest in restaurants:
    session.add(Restaurant(**rest))

session.commit()  # Commit after inserting restaurants

menu_items = [
  {
    "name": "Margherita Pizza",
    "price": 12,
    "description": "Classic tomato and cheese pizza",
    "image": "https://images.unsplash.com/photo-1604917877934-07d8d248d396?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    "restaurantName": "Pizza Palace"
  },
  {
    "name": "Pepperoni Pizza",
    "price": 15,
    "description": "Spicy pepperoni on a cheese pizza",
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    "restaurantName": "Pizza Palace"
  },
  {
    "name": "Veggie Burger",
    "price": 10,
    "description": "Loaded with fresh veggies and cheese",
    "image": "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    "restaurantName": "Burger Haven"
  },
  {
    "name": "Chicken Burger",
    "price": 12,
    "description": "Crispy chicken with special sauce",
    "image": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    "restaurantName": "Burger Haven"
  },
  {
    "name": "Salmon Sushi",
    "price": 20,
    "description": "Fresh salmon with sushi rice",
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    "restaurantName": "Sushi World"
  },
  {
    "name": "Butter Chicken",
    "price": 14,
    "description": "Rich tomato gravy with chicken",
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    "restaurantName": "Tandoori Corner"
  },
  {
    "name": "Paneer Tikka",
    "price": 13,
    "description": "Grilled paneer with spices",
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    "restaurantName": "Tandoori Corner"
  },
  {
    "name": "Pesto Pasta",
    "price": 16,
    "description": "Creamy pesto sauce with pasta",
    "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    "restaurantName": "Pasta Delight"
  },
  {
    "name": "Mushroom Risotto",
    "price": 18,
    "description": "Creamy risotto with mushrooms",
    "image": "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    "restaurantName": "Pasta Delight"
  },
  {
    "name": "Tofu Salad",
    "price": 11,
    "description": "Healthy tofu salad with dressing",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    "restaurantName": "Vegan Bites"
  }
]

for item in menu_items:
    session.add(Menu(**item))

session.commit()    

riders = []
for restaurant in restaurants:
    riders.append({ "restaurantName": restaurant["restaurantName"], "assigned": 0})
    riders.append({"restaurantName": restaurant["restaurantName"], "assigned": 0})

try:
    # Add riders
    for rider in riders:
        session.add(Riders(**rider))

    # Commit the session
    session.commit()
    print("Database populated successfully!")

except Exception as e:
    session.rollback()
    print("Error:", e)

finally:
    session.close()
