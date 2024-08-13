from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import re

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(100), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    phone = Column(String(20), nullable=True)
    password = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False, default='user')

    discussions = relationship('Discussion', back_populates='user')
    enrollments = relationship('Enrollment', back_populates='user')
    payments = relationship('Payment', back_populates='user')

    @staticmethod
    def validate_email(email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Invalid email address")

    @staticmethod
    def validate_phone(phone):
        if phone and not re.match(r"^\+?\d{9,15}$", phone):
            raise ValueError("Invalid phone number")

    @staticmethod
    def validate_password(password):
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long")

    @staticmethod
    def validate_username(username):
        if not username or len(username) < 3:
            raise ValueError("Username must be at least 3 characters long")

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'phone': self.phone,
            'role': self.role
        }

class Discussion(db.Model):
    __tablename__ = 'discussions'

    id = Column(Integer, primary_key=True)
    topic = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    comment = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    course_id = Column(Integer, ForeignKey('courses.id'), nullable=False)

    user = relationship('User', back_populates='discussions')
    course = relationship('Course', back_populates='discussions')

    def to_dict(self):
        return {
            'id': self.id,
            'topic': self.topic,
            'content': self.content,
            'comment': self.comment,
            'user_id': self.user_id,
            'course_id': self.course_id
        }

class Lesson(db.Model):
    __tablename__ = 'lessons'

    id = Column(Integer, primary_key=True)
    topic = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    video_url = Column(String(255), nullable=True)
    course_id = Column(Integer, ForeignKey('courses.id'), nullable=False)

    course = relationship('Course', back_populates='lessons')

    def to_dict(self):
        return {
            'id': self.id,
            'topic': self.topic,
            'content': self.content,
            'video_url': self.video_url,
            'course_id': self.course_id
        }

class Enrollment(db.Model):
    __tablename__ = 'enrollments'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    course_id = Column(Integer, ForeignKey('courses.id'), nullable=False)

    user = relationship('User', back_populates='enrollments')
    course = relationship('Course', back_populates='enrollments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'course_id': self.course_id
        }

class Course(db.Model):
    __tablename__ = 'courses'

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    rating = Column(Float, nullable=True)

    lessons = relationship('Lesson', back_populates='course')
    enrollments = relationship('Enrollment', back_populates='course')
    discussions = relationship('Discussion', back_populates='course')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'rating': self.rating
        }

class Payment(db.Model):
    __tablename__ = 'payments'

    id = Column(Integer, primary_key=True)
    amount = Column(Float, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    name = Column(String(255), nullable=True)
    course_id = Column(Integer, ForeignKey('courses.id'), nullable=False)
    method_of_payment = Column(String(255), nullable=False)
    card_number = Column(String(16), nullable=True)
    expiry_date = Column(DateTime, nullable=True)
    cvv = Column(String(3), nullable=True)
    phone_number = Column(String(15), nullable=True)
    mpesa_reference = Column(String(50), nullable=True)

    user = relationship('User', back_populates='payments')
    course = relationship('Course')

    @staticmethod
    def validate_payment_method(method_of_payment, card_number=None, expiry_date=None, cvv=None, phone_number=None, mpesa_reference=None):
        if method_of_payment not in ['credit_card', 'mpesa']:
            raise ValueError("Invalid payment method")

        if method_of_payment == 'credit_card':
            if not card_number or not expiry_date or not cvv:
                raise ValueError("Card details are required for credit card payments")
            if not re.match(r"^\d{16}$", card_number):
                raise ValueError("Invalid card number")
            if not re.match(r"^\d{3}$", cvv):
                raise ValueError("Invalid CVV")
            if not isinstance(expiry_date, datetime):
                raise ValueError("Invalid expiry date format")

        if method_of_payment == 'mpesa':
            if not phone_number or not mpesa_reference:
                raise ValueError("Phone number and M-Pesa reference are required for M-Pesa payments")
            if not re.match(r"^\+?\d{9,15}$", phone_number):
                raise ValueError("Invalid phone number")

    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'user_id': self.user_id,
            'name': self.name,
            'course_id': self.course_id,
            'method_of_payment': self.method_of_payment,
            'card_number': self.card_number,
            'expiry_date': self.expiry_date,
            'cvv': self.cvv,
            'phone_number': self.phone_number,
            'mpesa_reference': self.mpesa_reference
        }
