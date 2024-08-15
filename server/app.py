from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from models import db, User, Discussion, Lesson, Enrollment, Course, Payment
from config import get_config
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
app.config.from_object(get_config())

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
bcrypt = Bcrypt(app)

# Initialize CORS with specific origin
CORS(app, resources={r"/*": {"origins": "*"}})  # Adjust the origin as needed

# JWT Secret Key
SECRET_KEY = app.config['SECRET_KEY']

@app.route('/')
def index():
    return "Welcome to the API!", 200

@app.route('/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone')
    role = data.get('role', 'user')  # Default to 'user' if role is not provided

    # Validate the data
    if not username or not email or not password:
        return jsonify({'message': 'Username, email, and password are required'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400

    # Create a new user
    new_user = User(
        username=username,
        email=email,
        phone=phone,
        role=role,
        password=bcrypt.generate_password_hash(password).decode('utf-8')
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')
        return jsonify({'access_token': token, 'role': user.role, 'id': user.id})
    
    return jsonify({'message': 'Invalid credentials'}), 401

class UserResource(Resource):
    def get(self, user_id=None):
        if user_id is not None:
            user = User.query.get(user_id)
            if user:
                return jsonify(user.to_dict())
            return {'message': 'User not found'}, 404
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])

    def post(self):
        data = request.get_json()
        try:
            User.validate_email(data['email'])
            User.validate_phone(data['phone'])
            User.validate_password(data['password'])
            User.validate_username(data['username'])
        except ValueError as e:
            return {'message': str(e)}, 400

        new_user = User(
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
            try:
                if 'email' in data:
                    User.validate_email(data['email'])
                    user.email = data['email']
                if 'phone' in data:
                    User.validate_phone(data['phone'])
                    user.phone = data['phone']
                if 'password' in data:
                    User.validate_password(data['password'])
                    user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
                if 'username' in data:
                    User.validate_username(data['username'])
                    user.username = data['username']
            except ValueError as e:
                return {'message': str(e)}, 400

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
    def post(self, course_id):
        data = request.get_json()
        new_discussion = Discussion(
            topic=data['topic'],
            content=data['content'],
            comment=data.get('comment'),
            user_id=data['user_id'],
            course_id=course_id
        )
        db.session.add(new_discussion)
        db.session.commit()
        return {'message': 'Discussion created successfully'}, 201

    def get(self, course_id=None, discussion_id=None):
        if discussion_id is not None:
            discussion = Discussion.query.get(discussion_id)
            if discussion:
                return jsonify(discussion.to_dict())
            return {'message': 'Discussion not found'}, 404
        if course_id is not None:
            discussions = Discussion.query.filter_by(course_id=course_id).all()
            return jsonify([discussion.to_dict() for discussion in discussions])
        discussions = Discussion.query.all()
        return jsonify([discussion.to_dict() for discussion in discussions])

    def delete(self, discussion_id):
        discussion = Discussion.query.get(discussion_id)
        if discussion:
            db.session.delete(discussion)
            db.session.commit()
            return {'message': 'Discussion deleted successfully'}
        return {'message': 'Discussion not found'}, 404

class EnrollmentResource(Resource):
    def get(self, user_id=None, course_id=None):
        if user_id and course_id:
            enrollment = Enrollment.query.filter_by(user_id=user_id, course_id=course_id).first()
            if enrollment:
                return jsonify(enrollment.to_dict())
            return {'message': 'Enrollment not found'}, 404
        enrollments = Enrollment.query.all()
        return jsonify([enrollment.to_dict() for enrollment in enrollments])

    def post(self):
        data = request.get_json()
        new_enrollment = Enrollment(
            user_id=data['user_id'],
            course_id=data['course_id']
        )
        db.session.add(new_enrollment)
        db.session.commit()
        return {'message': 'Enrollment created successfully'}, 201

    def patch(self, user_id, course_id):
        enrollment = Enrollment.query.filter_by(user_id=user_id, course_id=course_id).first()
        if enrollment:
            data = request.get_json()
            enrollment.user_id = data.get('user_id', enrollment.user_id)
            enrollment.course_id = data.get('course_id', enrollment.course_id)
            db.session.commit()
            return {'message': 'Enrollment updated successfully'}
        return {'message': 'Enrollment not found'}, 404

    def delete(self, user_id, course_id):
        enrollment = Enrollment.query.filter_by(user_id=user_id, course_id=course_id).first()
        if enrollment:
            db.session.delete(enrollment)
            db.session.commit()
            return {'message': 'Enrollment deleted successfully'}
        return {'message': 'Enrollment not found'}, 404
@app.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course_by_id(course_id):
    course = Course.query.get(course_id)
    if course:
        return jsonify(course.to_dict())
    return jsonify({'message': 'Course not found'}), 404
@app.route('/api/courses', methods=['GET'])
def get_courses():
    print("Received request for /api/courses")
    courses = Course.query.all()
    if not courses:
        return jsonify({'message': 'No courses found'}), 404
    return jsonify([course.to_dict() for course in courses])
@app.route('/api/courses', methods=['POST'])
def create_course():
    data = request.get_json()
    name = data.get('name')
    
    if not name:
        return jsonify({'message': 'Course name is required'}), 400

    new_course = Course(name=name)
    db.session.add(new_course)
    db.session.commit()

    return jsonify(new_course.to_dict()), 201

@app.route('/api/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = Course.query.get(course_id)
    if course:
        db.session.delete(course)
        db.session.commit()
        return jsonify({'message': 'Course deleted successfully'})
    return jsonify({'message': 'Course not found'}), 404

class LessonResource(Resource):
    def get(self, lesson_id=None):
        if lesson_id is not None:
            lesson = Lesson.query.get(lesson_id)
            if lesson:
                return jsonify(lesson.to_dict())
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

    def patch(self, lesson_id):
        lesson = Lesson.query.get(lesson_id)
        if lesson:
            data = request.get_json()
            lesson.topic = data.get('topic', lesson.topic)
            lesson.content = data.get('content', lesson.content)
            lesson.video_url = data.get('video_url', lesson.video_url)
            lesson.course_id = data.get('course_id', lesson.course_id)
            db.session.commit()
            return {'message': 'Lesson updated successfully'}
        return {'message': 'Lesson not found'}, 404

    def delete(self, lesson_id):
        lesson = Lesson.query.get(lesson_id)
        if lesson:
            db.session.delete(lesson)
            db.session.commit()
            return {'message': 'Lesson deleted successfully'}
        return {'message': 'Lesson not found'}, 404
    

@app.route('/api/courses/<int:course_id>/lessons', methods=['GET'])
def get_lessons_by_course(course_id):
    lessons = Lesson.query.filter_by(course_id=course_id).all()
    if not lessons:
        return jsonify({'message': 'No lessons found for this course'}), 404
    return jsonify([lesson.to_dict() for lesson in lessons])
@app.route('/api/courses/<int:course_id>', methods=['GET', 'DELETE'])
def manage_course(course_id):
    try:
        if request.method == 'GET':
            course = Course.query.get(course_id)
            if course:
                return jsonify(course.to_dict())
            return jsonify({'message': 'Course not found'}), 404
        
        elif request.method == 'DELETE':
            course = Course.query.get(course_id)
            if course:
                db.session.delete(course)
                db.session.commit()
                return jsonify({'message': 'Course deleted successfully'}), 200
            return jsonify({'message': 'Course not found'}), 404
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/api/payment', methods=['POST'])
def process_payment():
    data = request.get_json()
    print(f"Received data: {data}")

    user_id = data.get('user_id')
    course_id = data.get('course_id')
    amount = data.get('amount')
    method_of_payment = data.get('method_of_payment')
    card_number = data.get('card_number')
    expiry_date = data.get('expiry_date')
    cvv = data.get('cvv')
    phone_number = data.get('phone_number')
    mpesa_reference = data.get('mpesa_reference')

    if not user_id or not course_id or not amount or not method_of_payment:
        return jsonify({'message': 'User ID, course ID, amount, and payment method are required'}), 400

    try:
        new_payment = Payment(
            user_id=user_id,
            course_id=course_id,
            amount=amount,
            method_of_payment=method_of_payment,
            card_number=card_number,
            expiry_date=expiry_date,
            cvv=cvv,
            phone_number=phone_number,
            mpesa_reference=mpesa_reference
        )
        db.session.add(new_payment)
        db.session.commit()

        return jsonify({'message': 'Payment processed successfully'}), 200
    except Exception as e:
        print(f"Error processing payment: {e}")
        db.session.rollback()
        return jsonify({'message': 'Failed to process payment'}), 500


@app.route('/api/enrollments/update_status', methods=['POST'])
def update_enrollment_status():
    data = request.get_json()
    user_id = data.get('user_id')
    course_id = data.get('course_id')
    enrollment_status = data.get('enrollment_status')

    enrollment = Enrollment.query.filter_by(user_id=user_id, course_id=course_id).first()
    if enrollment:
        enrollment.enrollment_status = enrollment_status
        db.session.commit()
        return jsonify({'message': 'Enrollment status updated successfully'}), 200
    return jsonify({'message': 'Enrollment not found'}), 404

api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(LessonResource, '/lessons', '/lessons/<int:lesson_id>')
api.add_resource(EnrollmentResource, '/enrollments', '/enrollments/<int:user_id>/<int:course_id>')
api.add_resource(DiscussionResource, '/courses/<int:course_id>/discussions', '/discussions/<int:discussion_id>')

if __name__ == '__main__':
    app.run(debug=True, port=5555)