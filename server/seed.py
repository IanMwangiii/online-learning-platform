from sqlalchemy.exc import IntegrityError
from app import app, db
from models import User, Course, Lesson, Enrollment, Payment


def seed_db():
    with app.app_context():
        db.create_all()
        
        # Seed Users
        try:
            users = [
                User(username='john_doe', email='john@example.com', password='password123', phone='+254701234567'),
                User(username='jane_doe', email='jane@example.com', password='password123', phone='+254701234568'),
                User(username='alice_smith', email='alice@example.com', password='password123', phone='+254701234569'),
                User(username='bob_jones', email='bob@example.com', password='password123', phone='+254701234570'),
                User(username='carol_white', email='carol@example.com', password='password123', phone='+254701234571'),
                User(username='dave_black', email='dave@example.com', password='password123', phone='+254701234572'),
                User(username='eve_green', email='eve@example.com', password='password123', phone='+254701234573'),
                User(username='frank_brown', email='frank@example.com', password='password123', phone='+254701234574'),
                User(username='grace_lee', email='grace@example.com', password='password123', phone='+254701234575'),
                User(username='harry_wilson', email='harry@example.com', password='password123', phone='+254701234576')
            ]
            db.session.add_all(users)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()

        # Seed Courses
        courses = [
            Course(name='Flask for Beginners', description='Learn Flask from scratch.', price=100.00, rating=4.5),
            Course(name='Advanced React', description='Deep dive into React.', price=150.00, rating=4.8),
            Course(name='Python Data Analysis', description='Master data analysis with Python.', price=120.00, rating=4.7),
            Course(name='Django for Web Development', description='Build robust web applications with Django.', price=130.00, rating=4.6),
            Course(name='Machine Learning with Python', description='Introduction to Machine Learning.', price=200.00, rating=4.9),
            Course(name='JavaScript Essentials', description='Learn the fundamentals of JavaScript.', price=90.00, rating=4.4),
            Course(name='Data Structures and Algorithms', description='Master algorithms and data structures.', price=180.00, rating=4.8),
            Course(name='HTML & CSS for Beginners', description='Start your web development journey.', price=70.00, rating=4.3),
            Course(name='DevOps with Docker', description='Learn DevOps practices using Docker.', price=140.00, rating=4.7),
            Course(name='Cybersecurity Basics', description='Learn the basics of cybersecurity.', price=110.00, rating=4.6)
        ]
        db.session.add_all(courses)

        # Seed Lessons
        lessons = [
            Lesson(topic='Introduction to Flask', content='This lesson covers the basics of Flask.', course_id=1),
            Lesson(topic='State Management in React', content='Learn how to manage state in React.', course_id=2),
            Lesson(topic='Introduction to Data Analysis', content='Learn the basics of data analysis using Python.', course_id=3),
            Lesson(topic='Getting Started with Django', content='Introduction to Django web framework.', course_id=4),
            Lesson(topic='Supervised Learning', content='Understanding supervised learning.', course_id=5),
            Lesson(topic='JavaScript Variables and Data Types', content='Introduction to variables in JavaScript.', course_id=6),
            Lesson(topic='Sorting Algorithms', content='Learn about different sorting algorithms.', course_id=7),
            Lesson(topic='Building a Simple Web Page', content='Create your first web page with HTML and CSS.', course_id=8),
            Lesson(topic='Getting Started with Docker', content='Introduction to Docker and containers.', course_id=9),
            Lesson(topic='Understanding Threats', content='Learn about different types of cybersecurity threats.', course_id=10)
        ]
        db.session.add_all(lessons)

        # Seed Enrollments
        enrollments = [
            Enrollment(user_id=1, course_id=1),
            Enrollment(user_id=2, course_id=2),
            Enrollment(user_id=3, course_id=3),
            Enrollment(user_id=4, course_id=4),
            Enrollment(user_id=5, course_id=5),
            Enrollment(user_id=6, course_id=6),
            Enrollment(user_id=7, course_id=7),
            Enrollment(user_id=8, course_id=8),
            Enrollment(user_id=9, course_id=9),
            Enrollment(user_id=10, course_id=10)
        ]
        db.session.add_all(enrollments)

        # Seed Payments
        payments = [
            Payment(amount=100.00, user_id=1, course_id=1, method_of_payment='credit_card', card_number='4111111111111111', expiry_date='12/25', cvv='123'),
            Payment(amount=150.00, user_id=2, course_id=2, method_of_payment='mpesa', mpesa_reference='MPESA12345'),
            Payment(amount=120.00, user_id=3, course_id=3, method_of_payment='credit_card', card_number='4111111111111111', expiry_date='12/25', cvv='123'),
            Payment(amount=130.00, user_id=4, course_id=4, method_of_payment='mpesa', mpesa_reference='MPESA12346'),
            Payment(amount=200.00, user_id=5, course_id=5, method_of_payment='credit_card', card_number='4111111111111111', expiry_date='12/25', cvv='123'),
            Payment(amount=90.00, user_id=6, course_id=6, method_of_payment='mpesa', mpesa_reference='MPESA12347'),
            Payment(amount=180.00, user_id=7, course_id=7, method_of_payment='credit_card', card_number='4111111111111111', expiry_date='12/25', cvv='123'),
            Payment(amount=70.00, user_id=8, course_id=8, method_of_payment='mpesa', mpesa_reference='MPESA12348'),
            Payment(amount=140.00, user_id=9, course_id=9, method_of_payment='credit_card', card_number='4111111111111111', expiry_date='12/25', cvv='123'),
            Payment(amount=110.00, user_id=10, course_id=10, method_of_payment='mpesa', mpesa_reference='MPESA12349')
        ]
        db.session.add_all(payments)

        db.session.commit()

if __name__ == '__main__':
    seed_db()