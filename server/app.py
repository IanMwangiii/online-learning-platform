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
        except jwt.ExpiredSignatureError:
            return {'message': 'Token has expired! Please log in again.'}, 403
        except jwt.InvalidTokenError:
            return {'message': 'Invalid token! Please log in again.'}, 403
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
            name=data['name'],
            description=data['description'],
            price=data['price'],
            rating=data.get('rating')
        )
        db.session.add(new_course)
        db.session.commit()
        return {'message': 'Course created successfully'}, 201

    @token_required
    def patch(self, course_id):
        course = Course.query.get(course_id)
        if course:
            data = request.get_json()
            course.name = data.get('name', course.name)
            course.description = data.get('description', course.description)
            course.price = data.get('price', course.price)
            course.rating = data.get('rating', course.rating)
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
    def get(self, payment_id=None):
        if payment_id is not None:
            payment = Payment.query.get(payment_id)
            if payment:
                return jsonify(payment.to_dict())
            return {'message': 'Payment not found'}, 404
        payments = Payment.query.all()
        return jsonify([payment.to_dict() for payment in payments])

    @token_required
    def post(self):
        data = request.get_json()
        try:
            new_payment = Payment(
                user_id=data['user_id'],
                course_id=data['course_id'],
                amount=data['amount']
            )
            db.session.add(new_payment)
            db.session.commit()
            return {'message': 'Payment processed successfully'}, 201
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

    @token_required
    def patch(self, payment_id):
        payment = Payment.query.get(payment_id)
        if payment:
            data = request.get_json()
            payment.user_id = data.get('user_id', payment.user_id)
            payment.course_id = data.get('course_id', payment.course_id)
            payment.amount = data.get('amount', payment.amount)
            db.session.commit()
            return {'message': 'Payment updated successfully'}
        return {'message': 'Payment not found'}, 404

    @token_required
    def delete(self, payment_id):
        payment = Payment.query.get(payment_id)
        if payment:
            db.session.delete(payment)
            db.session.commit()
            return {'message': 'Payment deleted successfully'}
        return {'message': 'Payment not found'}, 404

# Add resources to API
api.add_resource(UserResource, '/user', '/user/<int:user_id>')
api.add_resource(CourseResource, '/course', '/course/<int:course_id>')
api.add_resource(PaymentResource, '/payment', '/payment/<int:payment_id>')

if __name__ == '__main__':
    app.run(debug=True, port=5555)
