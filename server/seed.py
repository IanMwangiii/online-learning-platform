from models import db, User, Course, Lesson, Enrollment, Payment, Discussion
from app import app

with app.app_context():
    db.create_all()

    # Create Users
    users = [
        User(name="Alice", username="alice123", email="alice@gmail.com", phone="0123456789", password=User.validate_password("Password123")),
        User(name="Bob", username="bob456", email="bob@gmail.com", phone="0987654321", password=User.validate_password("Password456")),
        User(name="Carol", username="carol789", email="carol@gmail.com", phone="0234567890", password=User.validate_password("Password789")),
        User(name="David", username="david321", email="david@gmail.com", phone="0345678901", password=User.validate_password("Password321")),
        User(name="Eve", username="eve432", email="eve@gmail.com", phone="0456789012", password=User.validate_password("Password432")),
        User(name="Frank", username="frank543", email="frank@gmail.com", phone="0567890123", password=User.validate_password("Password543")),
        User(name="Grace", username="grace654", email="grace@gmail.com", phone="0678901234", password=User.validate_password("Password654")),
        User(name="Hank", username="hank765", email="hank@gmail.com", phone="0789012345", password=User.validate_password("Password765")),
        User(name="Ivy", username="ivy876", email="ivy@gmail.com", phone="0890123456", password=User.validate_password("Password876")),
        User(name="Jack", username="jack987", email="jack@gmail.com", phone="0901234567", password=User.validate_password("Password987"))
    ]
    db.session.add_all(users)
    db.session.commit()

    # Create Courses
    courses = [
        Course(name="Advanced Data Science", description="In-depth course on data science techniques and tools.", rating=4.9, price=120000.00),
        Course(name="Machine Learning Fundamentals", description="Basics of machine learning algorithms and applications.", rating=4.8, price=150000.00),
        Course(name="Cloud Computing with AWS", description="Introduction to cloud services using AWS.", rating=4.7, price=130000.00),
        Course(name="Cybersecurity Essentials", description="Fundamentals of cybersecurity practices and technologies.", rating=4.6, price=140000.00),
        Course(name="Full Stack Web Development", description="Comprehensive course on full stack web development.", rating=4.8, price=160000.00),
        Course(name="Database Management", description="Essential concepts and techniques in database management.", rating=4.7, price=110000.00),
        Course(name="Artificial Intelligence", description="Introduction to artificial intelligence and its applications.", rating=4.8, price=140000.00),
        Course(name="IoT Innovations", description="Exploring innovations and applications of the Internet of Things.", rating=4.9, price=150000.00),
        Course(name="Software Engineering", description="Principles and practices of software engineering.", rating=4.7, price=125000.00),
        Course(name="Blockchain Technology", description="Introduction to blockchain technology and cryptocurrencies.", rating=4.6, price=135000.00)
    ]
    db.session.add_all(courses)
    db.session.commit()

    # Create Lessons
    lessons = [
        Lesson(topic="Introduction to Data Analysis", content="Learn the basics of data analysis using Python.", video_url="http://example.com/video1", course_id=courses[0].id),
        Lesson(topic="Advanced Data Visualization", content="Techniques for visualizing complex data sets.", video_url="http://example.com/video2", course_id=courses[0].id),
        Lesson(topic="Supervised Learning Algorithms", content="Understanding and applying supervised learning techniques.", video_url="http://example.com/video3", course_id=courses[1].id),
        Lesson(topic="Unsupervised Learning Techniques", content="Exploring unsupervised learning methods and applications.", video_url="http://example.com/video4", course_id=courses[1].id),
        Lesson(topic="Introduction to AWS Services", content="Overview of key AWS services and their use cases.", video_url="http://example.com/video5", course_id=courses[2].id),
        Lesson(topic="Deploying Applications on AWS", content="Learn how to deploy and manage applications using AWS.", video_url="http://example.com/video6", course_id=courses[2].id),
        Lesson(topic="Network Security Fundamentals", content="Basics of securing network communications and protocols.", video_url="http://example.com/video7", course_id=courses[3].id),
        Lesson(topic="Threat Detection and Response", content="Techniques for detecting and responding to cybersecurity threats.", video_url="http://example.com/video8", course_id=courses[3].id),
        Lesson(topic="Frontend Development with React", content="Building interactive user interfaces with React.", video_url="http://example.com/video9", course_id=courses[4].id),
        Lesson(topic="Backend Development with Node.js", content="Creating server-side applications using Node.js.", video_url="http://example.com/video10", course_id=courses[4].id),
        Lesson(topic="Database Design Principles", content="Understanding the principles of database design.", video_url="http://example.com/video11", course_id=courses[5].id),
        Lesson(topic="SQL Query Optimization", content="Techniques for optimizing SQL queries.", video_url="http://example.com/video12", course_id=courses[5].id),
        Lesson(topic="AI Concepts Overview", content="Introduction to core concepts in artificial intelligence.", video_url="http://example.com/video13", course_id=courses[6].id),
        Lesson(topic="Deep Learning Applications", content="Exploring applications of deep learning.", video_url="http://example.com/video14", course_id=courses[6].id),
        Lesson(topic="IoT Protocols", content="Overview of common Internet of Things protocols.", video_url="http://example.com/video15", course_id=courses[7].id),
        Lesson(topic="IoT Device Management", content="Managing and maintaining IoT devices.", video_url="http://example.com/video16", course_id=courses[7].id),
        Lesson(topic="Software Development Life Cycle", content="Understanding the phases of the software development life cycle.", video_url="http://example.com/video17", course_id=courses[8].id),
        Lesson(topic="Agile Methodologies", content="Exploring various agile methodologies for software development.", video_url="http://example.com/video18", course_id=courses[8].id),
        Lesson(topic="Blockchain Basics", content="Introduction to blockchain technology and its fundamentals.", video_url="http://example.com/video19", course_id=courses[9].id),
        Lesson(topic="Cryptocurrency Technologies", content="Exploring technologies behind cryptocurrencies.", video_url="http://example.com/video20", course_id=courses[9].id)
    ]
    db.session.add_all(lessons)
    db.session.commit()

    # Create Enrollments
    enrollments = [
        Enrollment(name=users[0].name, course_id=courses[0].id),
        Enrollment(name=users[1].name, course_id=courses[1].id),
        Enrollment(name=users[2].name, course_id=courses[2].id),
        Enrollment(name=users[3].name, course_id=courses[3].id),
        Enrollment(name=users[4].name, course_id=courses[4].id),
        Enrollment(name=users[5].name, course_id=courses[5].id),
        Enrollment(name=users[6].name, course_id=courses[6].id),
        Enrollment(name=users[7].name, course_id=courses[7].id),
        Enrollment(name=users[8].name, course_id=courses[8].id),
        Enrollment(name=users[9].name, course_id=courses[9].id)
    ]
    db.session.add_all(enrollments)
    db.session.commit()

    # Create Payments
    payments = [
        Payment(user_id=users[0].id, name=users[0].name, amount=120000.00, course_id=courses[0].id, method_of_payment="Card", card_number="1234567812345678", expiry_date="12/25", cvv="123"),
        Payment(user_id=users[1].id, name=users[1].name, amount=150000.00, course_id=courses[1].id, method_of_payment="Mpesa", phone_number="0987654321", mpesa_reference="MPESA12345"),
        Payment(user_id=users[2].id, name=users[2].name, amount=130000.00, course_id=courses[2].id, method_of_payment="Card", card_number="2345678923456789", expiry_date="01/26", cvv="456"),
        Payment(user_id=users[3].id, name=users[3].name, amount=140000.00, course_id=courses[3].id, method_of_payment="Mpesa", phone_number="0345678901", mpesa_reference="MPESA67890"),
        Payment(user_id=users[4].id, name=users[4].name, amount=160000.00, course_id=courses[4].id, method_of_payment="Card", card_number="3456789034567890", expiry_date="02/27", cvv="789"),
        Payment(user_id=users[5].id, name=users[5].name, amount=110000.00, course_id=courses[5].id, method_of_payment="Mpesa", phone_number="0567890123", mpesa_reference="MPESA23456"),
        Payment(user_id=users[6].id, name=users[6].name, amount=140000.00, course_id=courses[6].id, method_of_payment="Card", card_number="4567890145678901", expiry_date="03/28", cvv="012"),
        Payment(user_id=users[7].id, name=users[7].name, amount=150000.00, course_id=courses[7].id, method_of_payment="Mpesa", phone_number="0789012345", mpesa_reference="MPESA34567"),
        Payment(user_id=users[8].id, name=users[8].name, amount=125000.00, course_id=courses[8].id, method_of_payment="Card", card_number="5678901256789012", expiry_date="04/29", cvv="345"),
        Payment(user_id=users[9].id, name=users[9].name, amount=135000.00, course_id=courses[9].id, method_of_payment="Mpesa", phone_number="0901234567", mpesa_reference="MPESA45678")
    ]
    db.session.add_all(payments)
    db.session.commit()

    # Create Discussions
    discussions = [
        Discussion(content="Great introduction to data analysis!", user_id=users[0].id, course_id=courses[0].id),
        Discussion(content="The machine learning section is very informative.", user_id=users[1].id, course_id=courses[1].id),
        Discussion(content="Loving the hands-on AWS examples!", user_id=users[2].id, course_id=courses[2].id),
        Discussion(content="Cybersecurity tips are very practical.", user_id=users[3].id, course_id=courses[3].id),
        Discussion(content="This full stack course is comprehensive and well-structured.", user_id=users[4].id, course_id=courses[4].id),
        Discussion(content="Learned so much about SQL optimization!", user_id=users[5].id, course_id=courses[5].id),
        Discussion(content="AI concepts are well explained, can't wait to learn more!", user_id=users[6].id, course_id=courses[6].id),
        Discussion(content="IoT innovations are fascinating, looking forward to the next lesson.", user_id=users[7].id, course_id=courses[7].id),
        Discussion(content="Software engineering principles were very insightful.", user_id=users[8].id, course_id=courses[8].id),
        Discussion(content="Blockchain technology is the future, this course is a must!", user_id=users[9].id, course_id=courses[9].id)
    ]
    db.session.add_all(discussions)
    db.session.commit()

print("Database seeding completed successfully!")