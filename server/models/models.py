from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import MetaData

# Initialize SQLAlchemy with a naming convention
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

# User Model
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relationships
    courses = relationship('Course', secondary='enrollment', back_populates='users')
    discussions = relationship('Discussion', back_populates='user')
    payments = relationship('Payment', back_populates='user', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.name}>'

# Course Model
class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    instructor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relationships
    lessons = relationship('Lesson', back_populates='course', cascade='all, delete-orphan')
    discussions = relationship('Discussion', back_populates='course', cascade='all, delete-orphan')
    users = relationship('User', secondary='enrollment', back_populates='courses')
    payments = relationship('Payment', back_populates='course', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Course {self.title}>'

# Lesson Model
class Lesson(db.Model):
    __tablename__ = 'lessons'

    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    video_url = db.Column(db.String(255))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relationship
    course = db.relationship('Course', back_populates='lessons')

    def __repr__(self):
        return f'<Lesson {self.topic}>'

# Discussion Model
class Discussion(db.Model):
    __tablename__ = 'discussions'

    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relationships
    user = db.relationship('User', back_populates='discussions')
    course = db.relationship('Course', back_populates='discussions')

    def __repr__(self):
        return f'<Discussion {self.topic}>'

# Enrollment Model (Join Table for Many-to-Many)
class Enrollment(db.Model):
    __tablename__ = 'enrollment'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), primary_key=True)
    enrolled_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Enrollment User: {self.user_id}, Course: {self.course_id}>'

# Payment Model
class Payment(db.Model):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    payment_date = db.Column(db.DateTime, default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='payments')
    course = db.relationship('Course', back_populates='payments')

    def __repr__(self):
        return f'<Payment {self.amount} by User {self.user_id} for Course {self.course_id}>'
