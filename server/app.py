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

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return {'message': 'Token is missing!'}, 403
        try:
            token = token.split(" ")[1]  # Extract token from 'Bearer <token>'
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            print(f"Token payload: {payload}")  # Debug line
        except jwt.ExpiredSignatureError:
            return {'message': 'Token has expired!'}, 403
        except jwt.InvalidTokenError:
            return {'message': 'Invalid token!'}, 403
        return f(*args, **kwargs)
    return decorated_function

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
    @token_required
    def get(self, user_id=None):
        if user_id is not None:
            user = User.query.get(user_id)
            if user:
                return jsonify(user.to_dict())
            return {'message': 'User not found'}, 404
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])

    @token_required
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

    @token_required
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

    @token_required
    def delete(self, user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User deleted successfully'}
        return {'message': 'User not found'}, 404

class DiscussionResource(Resource):
    @token_required
    def get(self, discussion_id=None):
        if discussion_id is not None:
            discussion = Discussion.query.get(discussion_id)
            if discussion:
                return jsonify(discussion.to_dict())
            return {'message': 'Discussion not found'}, 404
        discussions = Discussion.query.all()
        return jsonify([discussion.to_dict() for discussion in discussions])

    @token_required
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

    @token_required
    def delete(self, discussion_id):
        discussion = Discussion.query.get(discussion_id)
        if discussion:
            db.session.delete(discussion)
            db.session.commit()
            return {'message': 'Discussion deleted successfully'}
        return {'message': 'Discussion not found'}, 404

class LessonResource(Resource):
    @token_required
    def get(self, lesson_id=None):
        if lesson_id is not None:
            lesson = Lesson.query.get(lesson_id)
            if lesson:
                return jsonify(lesson.to_dict())
            return {'message': 'Lesson not found'}, 404
        lessons = Lesson.query.all()
        return jsonify([lesson.to_dict() for lesson in lessons])

    @token_required
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
    @token_required
    def get(self, user_id=None, course_id=None):
        if user_id and course_id:
            enrollment = Enrollment.query.filter_by(user_id=user_id, course_id=course_id).first()
            if enrollment:
                return jsonify(enrollment.to_dict())
            return {'message': 'Enrollment not found'}, 404
        enrollments = Enrollment.query.all()
        return jsonify([enrollment.to_dict() for enrollment in enrollments])

    @token_required
    def post(self):
        data = request.get_json()
        new_enrollment = Enrollment(
            user_id=data['user_id'],
            course_id=data['course_id']
        )
        db.session.add(new_enrollment)
        db.session.commit()
        return {'message': 'Enrollment created successfully'}, 201

    @token_required
    def patch(self, user_id, course_id):
        enrollment = Enrollment.query.filter_by(user_id=user_id, course_id=course_id).first()
        if enrollment:
            data = request.get_json()
            enrollment.user_id = data.get('user_id', enrollment.user_id)
            enrollment.course_id = data.get('course_id', enrollment.course_id)
            db.session.commit()
            return {'message': 'Enrollment updated successfully'}
        return {'message': 'Enrollment not found'}, 404

    @token_required
    def delete(self, user_id, course_id):
        enrollment = Enrollment.query.filter_by(user_id=user_id, course_id=course_id).first()
        if enrollment:
            db.session.delete(enrollment)
            db.session.commit()
            return {'message': 'Enrollment deleted successfully'}
        return {'message': 'Enrollment not found'}, 404

class CourseResource(Resource):
    @token_required
    def get(self, course_id=None):
        if course_id is not None:
            course = Course.query.get(course_id)
            if course:
                return jsonify(course.to_dict())
            return {'message': 'Course not found'}, 404
        courses = Course.query.all()
        return jsonify([course.to_dict() for course in courses])

    @token_required
    def post(self):
        data = request.get_json()
        new_course = Course(
            title=data['title'],
            description=data.get('description'),
            image_url=data.get('image_url')
        )
        db.session.add(new_course)
        db.session.commit()
        return {'message': 'Course created successfully'}, 201

    @token_required
    def patch(self, course_id):
        course = Course.query.get(course_id)
        if course:
            data = request.get_json()
            course.title = data.get('title', course.title)
            course.description = data.get('description', course.description)
            course.image_url = data.get('image_url', course.image_url)
            db.session.commit()
            return {'message': 'Course updated successfully'}
        return {'message': 'Course not found'}, 404

    @token_required
    def delete(self, course_id):
        course = Course.query.get(course_id)
        if course:
            db.session.delete(course)
            db.session.commit()
            return {'message': 'Course deleted successfully'}
        return {'message': 'Course not found'}, 404

class PaymentResource(Resource):
    @token_required
    def post(self):
        data = request.get_json()
        new_payment = Payment(
            user_id=data['user_id'],
            course_id=data['course_id'],
            amount=data['amount']
        )
        db.session.add(new_payment)
        db.session.commit()
        return {'message': 'Payment processed successfully'}, 201

# Add resources to API
api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(DiscussionResource, '/discussions', '/discussions/<int:discussion_id>')
api.add_resource(LessonResource, '/lessons', '/lessons/<int:lesson_id>')
api.add_resource(EnrollmentResource, '/enrollments', '/enrollments/<int:user_id>/<int:course_id>')
api.add_resource(CourseResource, '/courses', '/courses/<int:course_id>')
api.add_resource(PaymentResource, '/payments')

if __name__ == '__main__':
    app.run(debug=True)