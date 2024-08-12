from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=True)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='user')

    discussions = db.relationship('Discussion', backref='user', lazy=True)
    enrollments = db.relationship('Enrollment', backref='user', lazy=True)
    payments = db.relationship('Payment', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'phone': self.phone,
            'role': self.role
        }

    @staticmethod
    def validate_email(email):
        # Example validation logic
        if '@' not in email:
            raise ValueError('Invalid email address')

    @staticmethod
    def validate_phone(phone):
        if phone and len(phone) < 10:
            raise ValueError('Invalid phone number')

    @staticmethod
    def validate_password(password):
        if len(password) < 6:
            raise ValueError('Password must be at least 6 characters long')

    @staticmethod
    def validate_username(username):
        if len(username) < 3:
            raise ValueError('Username must be at least 3 characters long')

class Discussion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    comment = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

    course = db.relationship('Course', backref='discussions', lazy=True)

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
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    video_url = db.Column(db.String(255), nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'topic': self.topic,
            'content': self.content,
            'video_url': self.video_url,
            'course_id': self.course_id
        }

class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

    user = db.relationship('User', backref='enrollments', lazy=True)
    course = db.relationship('Course', backref='enrollments', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'course_id': self.course_id
        }

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Float, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'rating': self.rating
        }

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    name = db.Column(db.String(100), nullable=True)
    method_of_payment = db.Column(db.String(50), nullable=False)
    card_number = db.Column(db.String(20), nullable=True)
    expiry_date = db.Column(db.String(7), nullable=True)
    cvv = db.Column(db.String(4), nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    mpesa_reference = db.Column(db.String(50), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'user_id': self.user_id,
            'course_id': self.course_id,
            'name': self.name,
            'method_of_payment': self.method_of_payment,
            'card_number': self.card_number,
            'expiry_date': self.expiry_date,
            'cvv': self.cvv,
            'phone_number': self.phone_number,
            'mpesa_reference': self.mpesa_reference
        }
    user = db.relationship('User', backref=db.backref('payments', lazy=True))
    course = db.relationship('Course', backref=db.backref('payments', lazy=True))

    @staticmethod
    def validate_payment_method(method_of_payment, card_number=None, expiry_date=None, cvv=None, phone_number=None, mpesa_reference=None):
        if method_of_payment not in ['credit_card', 'mpesa']:
            raise ValueError('Invalid payment method')
        if method_of_payment == 'credit_card':
            if not card_number or not expiry_date or not cvv:
                raise ValueError('Credit card details are incomplete')
        elif method_of_payment == 'mpesa':
            if not mpesa_reference:
                raise ValueError('MPesa reference is required')
