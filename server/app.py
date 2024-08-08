from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from models.models import db, User, Discussion, Lesson, Enrollment, Course
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
        new_user = User(name=data['name'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201

    def patch(self, user_id):
        user = User.query.get(user_id)
        if user:
            data = request.get_json()
            user.name = data.get('name', user.name)
            user.email = data.get('email', user.email)
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
        new_discussion = Discussion(topic=data['topic'], post_id=data['post_id'])
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
        new_lesson = Lesson(title=data['title'], content=data['content'])
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
        new_enrollment = Enrollment(user_id=data['user_id'], course_id=data['course_id'])
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
        new_course = Course(title=data['title'], description=data['description'])
        db.session.add(new_course)
        db.session.commit()
        return {'message': 'Course created successfully'}, 201

# Register routes with API
api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(DiscussionResource, '/discussions', '/discussions/<int:discussion_id>')
api.add_resource(LessonResource, '/lessons', '/lessons/<int:lesson_id>')
api.add_resource(EnrollmentResource, '/enrollments', '/enrollments/<int:enrollment_id>')
api.add_resource(CourseResource, '/courses', '/courses/<int:course_id>')

if __name__ == '__main__':
    app.run(debug=True, port=5555)