from app import app, db
from models import User, Course, Lesson, Enrollment, Payment


def seed_db():
    with app.app_context():
        db.create_all()
        
        # Seed Users
        try:
            user1 = User(username='john_doe', email='john@example.com', password='password123', phone='+254701234567')
            user2 = User(username='jane_doe', email='jane@example.com', password='password123', phone='+254701234568')
            db.session.add_all([user1, user2])
            db.session.commit()
        except IntegrityError:
            db.session.rollback()

        # Seed Courses
        course1 = Course(name='Flask for Beginners', description='Learn Flask from scratch.', price=100.00, rating=4.5)
        course2 = Course(name='Advanced React', description='Deep dive into React.', price=150.00, rating=4.8)
        course3 = Course(name='Python Data Analysis', description='Master data analysis with Python.', price=120.00, rating=4.7)
        course4 = Course(name='Django for Web Development', description='Build robust web applications with Django.', price=130.00, rating=4.6)

        db.session.add_all([course1, course2, course3, course4])

        # Seed Lessons
        lesson1 = Lesson(topic='Introduction to Flask', content='This lesson covers the basics of Flask.', course_id=1)
        lesson2 = Lesson(topic='State Management in React', content='Learn how to manage state in React.', course_id=2)
        db.session.add_all([lesson1, lesson2])

        # Seed Enrollments
        enrollment1 = Enrollment(user_id=1, course_id=1)
        enrollment2 = Enrollment(user_id=2, course_id=2)
        db.session.add_all([enrollment1, enrollment2])

        # Seed Payments
        payment1 = Payment(amount=100.00, user_id=1, course_id=1, method_of_payment='credit_card', card_number='4111111111111111', expiry_date='12/25', cvv='123')
        payment2 = Payment(amount=150.00, user_id=2, course_id=2, method_of_payment='mpesa', mpesa_reference='MPESA12345')
        db.session.add_all([payment1, payment2])

        db.session.commit()

if __name__ == '__main__':
    seed_db()
