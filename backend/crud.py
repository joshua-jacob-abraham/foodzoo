# crud.py
from sqlalchemy.orm import Session
from models import Menu, Transactions, Orders, Users, Riders
import datetime

def get_all_foods(db: Session):
    return db.query(Menu).all()

def get_foods_from_restaurant(db: Session, restaurant_name: str):
    return db.query(Menu).filter(Menu.restaurant_name == restaurant_name).all()

def create_order(db: Session, username: str, restaurant_name: str, amount: int, receiver: str, address: str, phone: str, order_id: str):
    order = Orders(order_id=order_id, receiver=receiver, address=address, phone=phone, assigned=0, status=False)
    transaction = Transactions(order_id=order_id, username=username, restaurant_name=restaurant_name, amount=amount, time=datetime.datetime.utcnow(), status=True)
    db.add(order)
    db.add(transaction)
    db.commit()

def assign_rider(db: Session, restaurant_name: str, order_id: str):
    rider = db.query(Riders).filter(Riders.restaurantName == restaurant_name, Riders.assigned == False).first()
    
    if rider:
        rider.assigned = True  
        order = db.query(Orders).filter(Orders.order_id == order_id).first()
        if order:
            order.assigned = rider.id 
        db.commit()
        return rider.id  

    return None 

def mark_order_delivered(db: Session, order_id: str):
    order = db.query(Orders).filter(Orders.order_id == order_id).first()
    
    if order:
        order.status = True 

        if order.assigned:
            rider = db.query(Riders).filter(Riders.id == order.assigned).first()
            if rider:
                rider.assigned = False  

        db.commit()

def authenticate_user(db: Session, username: str, password: str):
    return db.query(Users).filter(Users.username == username, Users.password == password).first()

def create_user(db: Session, username: str, password: str):
    if db.query(Users).filter(Users.username == username).first():
        return None
    new_user = Users(username=username, password=password)
    db.add(new_user)
    db.commit()
    return new_user
