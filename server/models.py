from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import MetaData, CheckConstraint
from werkzeug.security import generate_password_hash, check_password_hash
import re
from flask import abort

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(10), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(10), nullable=True)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    discussions = relationship('Discussion', back_populates='user')
    payments = relationship('Payment', back_populates='user', foreign_keys='Payment.user_id', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.username}>'

    @staticmethod
    def validate_email(email):
        if not email.endswith('@gmail.com'):
            abort(400, description="Email must end with '@gmail.com'")

    @staticmethod
    def validate_phone(phone):
        if not phone.isdigit() or len(phone) != 10:
            abort(400, description="Phone number must be exactly 10 digits and contain no spaces")

    @staticmethod
    def validate_password(password):
        if len(password) < 8 or not re.search(r'[A-Za-z]', password) or not re.search(r'[0-9]', password):
            abort(400, description="Password must be at least 8 characters long and contain both letters and numbers, with no special symbols")

    @staticmethod
    def validate_username(username):
        if not re.match(r'^[A-Za-z0-9]{1,10}$', username):
            abort(400, description="Username must be unique, contain no special symbols, and be a maximum of 10 characters")


class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=True)
    price = db.Column(db.Float, nullable=False)

    lessons = relationship('Lesson', back_populates='course', cascade='all, delete-orphan')
    discussions = relationship('Discussion', back_populates='course', cascade='all, delete-orphan')
    payments = relationship('Payment', back_populates='course', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Course {self.name}>'


class Lesson(db.Model):
    __tablename__ = 'lessons'

    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    video_url = db.Column(db.String(255))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    course = db.relationship('Course', back_populates='lessons')

    def __repr__(self):
        return f'<Lesson {self.topic}>'


class Discussion(db.Model):
    __tablename__ = 'discussions'

    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)

    user = db.relationship('User', back_populates='discussions')
    course = db.relationship('Course', back_populates='discussions')

    def __repr__(self):
        return f'<Discussion {self.topic}>'


class Enrollment(db.Model):
    __tablename__ = 'enrollment'

    name = db.Column(db.String(100), db.ForeignKey('users.name'), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), primary_key=True)
    enrolled_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Enrollment User: {self.name}, Course: {self.course_id}>'


class Payment(db.Model):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), db.ForeignKey('users.name'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_date = db.Column(db.DateTime, default=db.func.current_timestamp())
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    method_of_payment = db.Column(db.String(10), nullable=False)
    card_number = db.Column(db.String(16), nullable=True)
    expiry_date = db.Column(db.String(5), nullable=True)
    cvv = db.Column(db.String(3), nullable=True)
    phone_number = db.Column(db.String(10), nullable=True)
    mpesa_reference = db.Column(db.String(20), nullable=True)

    user = relationship('User', back_populates='payments', foreign_keys=[user_id])
    course = db.relationship('Course', back_populates='payments')

    def __repr__(self):
        return f'<Payment {self.amount} by User {self.user_id} for Course {self.course_id}>'

    @staticmethod
    def validate_payment_method(method_of_payment, card_number=None, expiry_date=None, cvv=None, phone_number=None, mpesa_reference=None):
        if method_of_payment == "Card":
            if not card_number or not expiry_date or not cvv:
                abort(400, description="Card payment requires card number, expiry date, and CVV")
        elif method_of_payment == "Mpesa":
            if not phone_number or len(phone_number) != 10 or not phone_number.isdigit():
                abort(400, description="Mpesa payment requires a valid 10-digit phone number with no spaces")
            if not re.match(r'^[A-Z0-9]{1,20}$', mpesa_reference):
                abort(400, description="Mpesa payment requires a valid reference number")