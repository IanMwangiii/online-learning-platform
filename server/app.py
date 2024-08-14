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

# Token authentication middleware
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
            if current_user is None:
                return jsonify({'message': 'User not found!'}), 401
        except Exception as e:
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 401

        return f(current_user, *args, **kwargs)

    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user.role != 'admin':
            return jsonify({'message': 'Admin access required!'}), 403
        return f(current_user, *args, **kwargs)
    return decorated

# Routes
@app.route('/')
def index():
    return "Welcome to the API!", 200

# User registration route
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

# User login route
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

# Course CRUD operations
@app.route('/api/courses', methods=['GET'])
@token_required
def get_courses(current_user):
    courses = Course.query.all()
    if not courses:
        return jsonify({'message': 'No courses found'}), 404
    return jsonify([course.to_dict() for course in courses])

@app.route('/api/courses/<int:course_id>', methods=['GET'])
@token_required
def get_course(current_user, course_id):
    course = Course.query.get(course_id)
    if course:
        return jsonify(course.to_dict())
    return jsonify({'message': 'Course not found'}), 404

@app.route('/api/courses', methods=['POST'])
@token_required
@admin_required
def create_course(current_user):
    data = request.get_json()
    new_course = Course(
        title=data['title'],
        description=data.get('description'),
        duration=data.get('duration')
    )
    db.session.add(new_course)
    db.session.commit()
    return jsonify({'message': 'Course created successfully'}), 201

@app.route('/api/courses/<int:course_id>', methods=['PATCH'])
@token_required
@admin_required
def update_course(current_user, course_id):
    course = Course.query.get(course_id)
    if course:
        data = request.get_json()
        course.title = data.get('title', course.title)
        course.description = data.get('description', course.description)
        course.duration = data.get('duration', course.duration)
        db.session.commit()
        return jsonify({'message': 'Course updated successfully'})
    return jsonify({'message': 'Course not found'}), 404

@app.route('/api/courses/<int:course_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_course(current_user, course_id):
    course = Course.query.get(course_id)
    if course:
        db.session.delete(course)
        db.session.commit()
        return jsonify({'message': 'Course deleted successfully'})
    return jsonify({'message': 'Course not found'}), 404

# RESTful resources for Users and Discussions
class UserResource(Resource):
    @token_required
    def get(self, current_user, user_id=None):
        if user_id is not None:
            user = User.query.get(user_id)
            if user:
                return jsonify(user.to_dict())
            return {'message': 'User not found'}, 404
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])

    @token_required
    @admin_required
    def post(self, current_user):
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
    @admin_required
    def patch(self, current_user, user_id):
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
    @admin_required
    def delete(self, current_user, user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User deleted successfully'}
        return {'message': 'User not found'}, 404

class DiscussionResource(Resource):
    @token_required
    def post(self, current_user, course_id):
        data = request.get_json()
        new_discussion = Discussion(
            topic=data['topic'],
            content=data['content'],
            comment=data.get('comment'),
            user_id=current_user.id,
            course_id=course_id
        )
        db.session.add(new_discussion)
        db.session.commit()
        return {'message': 'Discussion created successfully'}, 201

    @token_required
    def get(self, current_user, course_id=None, discussion_id=None):
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

    @token_required
    @admin_required
    def delete(self, current_user, discussion_id):
        discussion = Discussion.query.get(discussion_id)
        if discussion:
            db.session.delete(discussion)
            db.session.commit()
            return {'message': 'Discussion deleted successfully'}
        return {'message': 'Discussion not found'}, 404

# Register the resources with the API
api.add_resource(UserResource, '/api/users', '/api/users/<int:user_id>')
api.add_resource(DiscussionResource, '/api/courses/<int:course_id>/discussions', '/api/discussions/<int:discussion_id>')

if __name__ == '__main__':
    app.run(debug=True, port=5555)
