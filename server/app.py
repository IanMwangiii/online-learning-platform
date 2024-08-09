from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from models.models import db, User, Discussion, Lesson, Enrollment, Course, Payment
from config import DevelopmentConfig

app = Flask(__name__)

app.config.from_object(DevelopmentConfig)

db.init_app(app)

migrate = Migrate(app, db)
api = Api(app)
CORS(app)
bcrypt = Bcrypt(app)

# CRUD for User
class UserResource(Resource):
    def get(self, user_id=None):
        if user_id:
            user = User.query.get(user_id)
            if user:
                return jsonify(user)
            return {'message': 'User not found'}, 404
        users = User.query.all()
        return jsonify(users)

    def post(self):
        data = request.get_json()
        new_user = User(
            name=data['name'],
            username=data['username'],
            email=data['email'],
            phone=data.get('phone'),
            password=bcrypt.generate_password_hash(data['password']).decode('utf-8')
        )
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201

    def patch(self, user_id):
        user = User.query.get(user_id)
        if user:
            data = request.get_json()
            user.name = data.get('name', user.name)
            user.email = data.get('email', user.email)
            user.username = data.get('username', user.username)
            user.phone = data.get('phone', user.phone)
            db.session.commit()
            return {'message': 'User updated successfully'}
        return {'message': 'User not found'}, 404

    def delete(self, user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User deleted successfully'}
        return {'message': 'User not found'}, 404


# CRUD for Discussion
class DiscussionResource(Resource):
    def get(self, discussion_id=None):
        if discussion_id:
            discussion = Discussion.query.get(discussion_id)
            if discussion:
                return jsonify(discussion)
            return {'message': 'Discussion not found'}, 404
        discussions = Discussion.query.all()
        return jsonify(discussions)

    def post(self):
        data = request.get_json()
        new_discussion = Discussion(
            topic=data['topic'],
            content=data['content'],
            comment=data.get('comment'),
            user_id=data['user_id'],
            course_id=data['course_id']
        )
        db.session.add(new_discussion)
        db.session.commit()
        return {'message': 'Discussion created successfully'}, 201

    def delete(self, discussion_id):
        discussion = Discussion.query.get(discussion_id)
        if discussion:
            db.session.delete(discussion)
            db.session.commit()
            return {'message': 'Discussion deleted successfully'}
        return {'message': 'Discussion not found'}, 404

# CRUD for Lesson
class LessonResource(Resource):
    def get(self, lesson_id=None):
        if lesson_id:
            lesson = Lesson.query.get(lesson_id)
            if lesson:
                return jsonify(lesson)
            return {'message': 'Lesson not found'}, 404
        lessons = Lesson.query.all()
        return jsonify(lessons)

    def post(self):
        data = request.get_json()
        new_lesson = Lesson(
            topic=data['topic'],
            content=data['content'],
            video_url=data.get('video_url'),
            course_id=data['course_id']
        )
        db.session.add(new_lesson)
        db.session.commit()
        return {'message': 'Lesson created successfully'}, 201

# CRUD for Enrollment
class EnrollmentResource(Resource):
    def get(self, enrollment_id=None):
        if enrollment_id:
            enrollment = Enrollment.query.get(enrollment_id)
            if enrollment:
                return jsonify(enrollment)
            return {'message': 'Enrollment not found'}, 404
        enrollments = Enrollment.query.all()
        return jsonify(enrollments)

    def post(self):
        data = request.get_json()
        new_enrollment = Enrollment(
            user_id=data['user_id'],
            course_id=data['course_id']
        )
        db.session.add(new_enrollment)
        db.session.commit()
        return {'message': 'Enrollment created successfully'}, 201

    def patch(self, enrollment_id):
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            data = request.get_json()
            enrollment.user_id = data.get('user_id', enrollment.user_id)
            enrollment.course_id = data.get('course_id', enrollment.course_id)
            db.session.commit()
            return {'message': 'Enrollment updated successfully'}
        return {'message': 'Enrollment not found'}, 404

    def delete(self, enrollment_id):
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            db.session.delete(enrollment)
            db.session.commit()
            return {'message': 'Enrollment deleted successfully'}
        return {'message': 'Enrollment not found'}, 404

# CRUD for Course
class CourseResource(Resource):
    def get(self, course_id=None):
        if course_id:
            course = Course.query.get(course_id)
            if course:
                return jsonify(course)
            return {'message': 'Course not found'}, 404
        courses = Course.query.all()
        return jsonify(courses)

    def post(self):
        data = request.get_json()
        new_course = Course(
            title=data['title'],
            description=data['description'],
            price=data['price'],
            rating=data.get('rating'),
            instructor_id=data['instructor_id']
        )
        db.session.add(new_course)
        db.session.commit()
        return {'message': 'Course created successfully'}, 201

# CRUD for Payment
class PaymentResource(Resource):
    def get(self, payment_id=None):
        if payment_id:
            payment = Payment.query.get(payment_id)
            if payment:
                return jsonify(payment)
            return {'message': 'Payment not found'}, 404
        payments = Payment.query.all()
        return jsonify(payments)

    def post(self):
        data = request.get_json()
        new_payment = Payment(
            amount=data['amount'],
            card_number=data['card_number'],
            expiry_date=data['expiry_date'],
            cvv=data['cvv'],
            user_id=data['user_id'],
            course_id=data['course_id']
        )
        db.session.add(new_payment)
        db.session.commit()
        return {'message': 'Payment created successfully'}, 201

    def delete(self, payment_id):
        payment = Payment.query.get(payment_id)
        if payment:
            db.session.delete(payment)
            db.session.commit()
            return {'message': 'Payment deleted successfully'}
        return {'message': 'Payment not found'}, 404

# Register routes with API
api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(DiscussionResource, '/discussions', '/discussions/<int:discussion_id>')
api.add_resource(LessonResource, '/lessons', '/lessons/<int:lesson_id>')
api.add_resource(EnrollmentResource, '/enrollments', '/enrollments/<int:enrollment_id>')
api.add_resource(CourseResource, '/courses', '/courses/<int:course_id>')
api.add_resource(PaymentResource, '/payments', '/payments/<int:payment_id>')

if __name__ == '__main__':
    app.run(debug=True, port=5555)