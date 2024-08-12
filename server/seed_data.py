from app import app, db
from models import User, Discussion, Lesson, Enrollment, Course, Payment
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)

with app.app_context():
    db.create_all()
    db.session.execute('TRUNCATE TABLE user RESTART IDENTITY CASCADE')
    db.session.execute('TRUNCATE TABLE discussion RESTART IDENTITY CASCADE')
    db.session.execute('TRUNCATE TABLE lesson RESTART IDENTITY CASCADE')
    db.session.execute('TRUNCATE TABLE enrollment RESTART IDENTITY CASCADE')
    db.session.execute('TRUNCATE TABLE course RESTART IDENTITY CASCADE')
    db.session.execute('TRUNCATE TABLE payment RESTART IDENTITY CASCADE')
    db.session.commit()

    # Add example users
    users = [
        User(name='Alice', username='alice', email='alice@example.com', phone='+1234567890', password=bcrypt.generate_password_hash('password123').decode('utf-8')),
        User(name='Bob', username='bob', email='bob@example.com', phone='+0987654321', password=bcrypt.generate_password_hash('password123').decode('utf-8')),
    ]
    db.session.add_all(users)

    # Add example courses
    courses = [
        Course(name='Python Basics', description='An introduction to Python programming.', price=99.99, rating=4.5),
        Course(name='Advanced Flask', description='Deep dive into Flask web development.', price=149.99, rating=4.8),
    ]
    db.session.add_all(courses)

    # Add example lessons
    lessons = [
        Lesson(topic='Introduction to Python', content='Learn the basics of Python programming.', video_url='http://example.com/video1', course_id=1),
        Lesson(topic='Flask Fundamentals', content='Understand the core concepts of Flask.', video_url='http://example.com/video2', course_id=2),
    ]
    db.session.add_all(lessons)

    # Add example enrollments
    enrollments = [
        Enrollment(name='Alice', course_id=1),
        Enrollment(name='Bob', course_id=2),
    ]
    db.session.add_all(enrollments)

    # Add example discussions
    discussions = [
        Discussion(topic='Python vs JavaScript', content='Which programming language is better?', comment='I think Python is more versatile.', user_id=1, course_id=1),
        Discussion(topic='Flask Best Practices', content='What are some best practices for using Flask?', comment='Using blueprints can help manage large applications.', user_id=2, course_id=2),
    ]
    db.session.add_all(discussions)

    # Add example payments
    payments = [
        Payment(amount=99.99, user_id=1, name='Alice', course_id=1, method_of_payment='credit_card', card_number='1234567812345678', expiry_date='12/24', cvv='123', phone_number='+1234567890', mpesa_reference=None),
        Payment(amount=149.99, user_id=2, name='Bob', course_id=2, method_of_payment='mpesa', card_number=None, expiry_date=None, cvv=None, phone_number='+0987654321', mpesa_reference='MPESA123456'),
    ]
    db.session.add_all(payments)

    db.session.commit()
