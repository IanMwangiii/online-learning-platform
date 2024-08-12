import os
from app import app, db
from models import User, Course, Lesson, Enrollment, Discussion, Payment
from flask_bcrypt import Bcrypt

# Initialize Bcrypt
bcrypt = Bcrypt(app)

def seed_users():
    with app.app_context():
        db.create_all()  # Create tables if they don't exist

        # Example user data
        users = [
            {
                'name': 'John Doe',
                'username': 'john_doe',
                'email': 'john@example.com',
                'phone': '1234567890',
                'password': 'password123'
            },
            {
                'name': 'Jane Smith',
                'username': 'jane_smith',
                'email': 'jane@example.com',
                'phone': '0987654321',
                'password': 'password456'
            }
        ]

        for user_data in users:
            hashed_password = bcrypt.generate_password_hash(user_data['password']).decode('utf-8')
            user = User(
                name=user_data['name'],
                username=user_data['username'],
                email=user_data['email'],
                phone=user_data['phone'],
                password=hashed_password
            )
            db.session.add(user)
        
        db.session.commit()

def seed_courses():
    with app.app_context():
        # Example course data
        courses = [
            {
                'name': 'Introduction to Python',
                'description': 'Learn the basics of Python programming.',
                'price': 49.99,
                'rating': 4.5
            },
            {
                'name': 'Advanced Flask',
                'description': 'Deep dive into advanced Flask features.',
                'price': 59.99,
                'rating': 4.7
            }
        ]

        for course_data in courses:
            course = Course(
                name=course_data['name'],
                description=course_data['description'],
                price=course_data['price'],
                rating=course_data['rating']
            )
            db.session.add(course)
        
        db.session.commit()

def seed_lessons():
    with app.app_context():
        # Example lesson data
        lessons = [
            {
                'topic': 'Getting Started with Python',
                'content': 'Introduction to Python basics.',
                'video_url': 'http://example.com/python_intro.mp4',
                'course_id': 1
            },
            {
                'topic': 'Flask Routing',
                'content': 'Understanding Flask routing mechanisms.',
                'video_url': 'http://example.com/flask_routing.mp4',
                'course_id': 2
            }
        ]

        for lesson_data in lessons:
            lesson = Lesson(
                topic=lesson_data['topic'],
                content=lesson_data['content'],
                video_url=lesson_data['video_url'],
                course_id=lesson_data['course_id']
            )
            db.session.add(lesson)
        
        db.session.commit()

def seed_enrollments():
    with app.app_context():
        # Example enrollment data
        enrollments = [
            {
                'user_id': 1,
                'course_id': 1
            },
            {
                'user_id': 2,
                'course_id': 2
            }
        ]

        for enrollment_data in enrollments:
            enrollment = Enrollment(
                user_id=enrollment_data['user_id'],
                course_id=enrollment_data['course_id']
            )
            db.session.add(enrollment)
        
        db.session.commit()

def seed_discussions():
    with app.app_context():
        # Example discussion data
        discussions = [
            {
                'topic': 'Python Variables',
                'content': 'Discuss different types of variables in Python.',
                'comment': 'Looking forward to this topic!',
                'user_id': 1,
                'course_id': 1
            },
            {
                'topic': 'Flask Best Practices',
                'content': 'Share your best practices for working with Flask.',
                'comment': 'Great to have a discussion on this!',
                'user_id': 2,
                'course_id': 2
            }
        ]

        for discussion_data in discussions:
            discussion = Discussion(
                topic=discussion_data['topic'],
                content=discussion_data['content'],
                comment=discussion_data['comment'],
                user_id=discussion_data['user_id'],
                course_id=discussion_data['course_id']
            )
            db.session.add(discussion)
        
        db.session.commit()

def seed_payments():
    with app.app_context():
        # Example payment data
        payments = [
            {
                'amount': 49.99,
                'user_id': 1,
                'name': 'John Doe',
                'course_id': 1,
                'method_of_payment': 'credit_card',
                'card_number': '4111111111111111',
                'expiry_date': '12/24',
                'cvv': '123',
                'phone_number': '1234567890'
            },
            {
                'amount': 59.99,
                'user_id': 2,
                'name': 'Jane Smith',
                'course_id': 2,
                'method_of_payment': 'mpesa',
                'mpesa_reference': 'M-PESA123456'
            }
        ]

        for payment_data in payments:
            payment = Payment(
                amount=payment_data['amount'],
                user_id=payment_data['user_id'],
                name=payment_data['name'],
                course_id=payment_data['course_id'],
                method_of_payment=payment_data['method_of_payment'],
                card_number=payment_data.get('card_number'),
                expiry_date=payment_data.get('expiry_date'),
                cvv=payment_data.get('cvv'),
                phone_number=payment_data.get('phone_number'),
                mpesa_reference=payment_data.get('mpesa_reference')
            )
            db.session.add(payment)
        
        db.session.commit()

if __name__ == '__main__':
    seed_users()
    seed_courses()
    seed_lessons()
    seed_enrollments()
    seed_discussions()
    seed_payments()
    print("Data seeding completed!")
