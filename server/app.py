from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from models.models import db, User, Discussion, Lesson, Enrollment, Course, Payment
from app_config import get_config

app = Flask(__name__)
app.config.from_object(get_config())

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app)
bcrypt = Bcrypt(app)

class UserResource(Resource):
    def get(self, user_id=None):
        if user_id:
            user = User.query.get(user_id)
            if user:
                return jsonify(user)
            return {'message': 'User not found'}, 404
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])

    def post(self):
        data = request.get_json()
        User.validate_email(data['email'])
        User.validate_phone(data['phone'])
        User.validate_password(data['password'])
        User.validate_username(data['username'])

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
            if 'email' in data:
                User.validate_email(data['email'])
            if 'phone' in data:
                User.validate_phone(data['phone'])
            if 'password' in data:
                User.validate_password(data['password'])
                user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            if 'username' in data:
                User.validate_username(data['username'])

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

class DiscussionResource(Resource):
    def get(self, discussion_id=None):
        if discussion_id:
            discussion = Discussion.query.get(discussion_id)
            if discussion:
                return jsonify(discussion)
            return {'message': 'Discussion not found'}, 404
        discussions = Discussion.query.all()
        return jsonify([discussion.to_dict() for discussion in discussions])

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

class LessonResource(Resource):
    def get(self, lesson_id=None):
        if lesson_id:
            lesson = Lesson.query.get(lesson_id)
            if lesson:
                return jsonify(lesson)
            return {'message': 'Lesson not found'}, 404
        lessons = Lesson.query.all()
        return jsonify([lesson.to_dict() for lesson in lessons])

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

class EnrollmentResource(Resource):
    def get(self, enrollment_id=None):
        if enrollment_id:
            enrollment = Enrollment.query.get(enrollment_id)
            if enrollment:
                return jsonify(enrollment)
            return {'message': 'Enrollment not found'}, 404
        enrollments = Enrollment.query.all()
        return jsonify([enrollment.to_dict() for enrollment in enrollments])

    def post(self):
        data = request.get_json()
        new_enrollment = Enrollment(
            name=data['name'],
            course_id=data['course_id']
        )
        db.session.add(new_enrollment)
        db.session.commit()
        return {'message': 'Enrollment created successfully'}, 201

    def patch(self, enrollment_id):
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            data = request.get_json()
            enrollment.name = data.get('name', enrollment.name)
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

class CourseResource(Resource):
    def get(self, course_id=None):
        if course_id:
            course = Course.query.get(course_id)
            if course:
                return jsonify(course)
            return {'message': 'Course not found'}, 404
        courses = Course.query.all()
        return jsonify([course.to_dict() for course in courses])

    def post(self):
        data = request.get_json()
        new_course = Course(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            rating=data.get('rating')
        )
        db.session.add(new_course)
        db.session.commit()
        return {'message': 'Course created successfully'}, 201

class PaymentResource(Resource):
    def get(self, payment_id=None):
        if payment_id:
            payment = Payment.query.get(payment_id)
            if payment:
                return jsonify(payment)
            return {'message': 'Payment not found'}, 404
        payments = Payment.query.all()
        return jsonify([payment.to_dict() for payment in payments])

    def post(self):
        data = request.get_json()
        Payment.validate_payment_method(
            method_of_payment=data['method_of_payment'],
            card_number=data.get('card_number'),
            expiry_date=data.get('expiry_date'),
            cvv=data.get('cvv'),
            phone_number=data.get('phone_number'),
            mpesa_reference=data.get('mpesa_reference')
        )

        new_payment = Payment(
            amount=data['amount'],
            user_id=data['user_id'],
            name=data['name'],
            course_id=data['course_id'],
            method_of_payment=data['method_of_payment'],
            card_number=data.get('card_number'),
            expiry_date=data.get('expiry_date'),
            cvv=data.get('cvv'),
            phone_number=data.get('phone_number'),
            mpesa_reference=data.get('mpesa_reference')
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

api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(DiscussionResource, '/discussions', '/discussions/<int:discussion_id>')
api.add_resource(LessonResource, '/lessons', '/lessons/<int:lesson_id>')
api.add_resource(EnrollmentResource, '/enrollments', '/enrollments/<int:enrollment_id>')
api.add_resource(CourseResource, '/courses', '/courses/<int:course_id>')
api.add_resource(PaymentResource, '/payments', '/payments/<int:payment_id>')

if __name__ == '_main_':
    app.run(debug=True, port=5555)