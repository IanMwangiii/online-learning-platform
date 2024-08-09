from faker import Faker
from models.models import db, User, Course, Lesson, Discussion, Enrollment, Payment
from app import app

fake = Faker()

with app.app_context():
    # Drop all tables and create them anew
    db.drop_all()
    db.create_all()

    # Seed Users
    users = []
    for _ in range(10):
        user = User(
            name=fake.name(),
            username=fake.user_name()[:10],
            email=fake.email(),
            phone=fake.numerify(text='##########'),
            password=fake.password(length=10, special_chars=False, digits=True, upper_case=True, lower_case=True)
        )
        db.session.add(user)
        users.append(user)
    
    db.session.commit()

    # Seed Courses
    courses = []
    for _ in range(10):
        course = Course(
            name=fake.text(max_nb_chars=20),
            description=fake.paragraph(nb_sentences=5),
            rating=fake.random_int(min=1, max=5),
            price=fake.random_number(digits=2)
        )
        db.session.add(course)
        courses.append(course)
    
    db.session.commit()

    # Seed Lessons
    for _ in range(10):
        lesson = Lesson(
            topic=fake.text(max_nb_chars=20),
            content=fake.paragraph(nb_sentences=5),
            video_url=fake.url(),
            course_id=fake.random_element(courses).id
        )
        db.session.add(lesson)
    
    db.session.commit()

    # Seed Discussions
    for _ in range(10):
        discussion = Discussion(
            topic=fake.text(max_nb_chars=20),
            content=fake.paragraph(nb_sentences=5),
            comment=fake.sentence(),
            user_id=fake.random_element(users).id,
            course_id=fake.random_element(courses).id
        )
        db.session.add(discussion)
    
    db.session.commit()

    # Seed Enrollments
    for _ in range(10):
        enrollment = Enrollment(
            name=fake.random_element(users).name,
            course_id=fake.random_element(courses).id
        )
        db.session.add(enrollment)
    
    db.session.commit()

    # Seed Payments
    for _ in range(10):
        payment = Payment(
            user_id=fake.random_element(users).id,
            name=fake.random_element(users).name,
            amount=fake.random_number(digits=3),
            method_of_payment=fake.random_element(['Card', 'Mpesa']),
            course_id=fake.random_element(courses).id,
            card_number=fake.credit_card_number() if fake.random_element([True, False]) else None,
            expiry_date=fake.credit_card_expire() if fake.random_element([True, False]) else None,
            cvv=fake.credit_card_security_code() if fake.random_element([True, False]) else None,
            phone_number=fake.numerify(text='##########') if fake.random_element([True, False]) else None,
            mpesa_reference=fake.bothify(text='??##########') if fake.random_element([True, False]) else None
        )
        db.session.add(payment)
    
    db.session.commit()

    print("Database seeded successfully!")
