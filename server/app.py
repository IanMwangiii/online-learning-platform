from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restx import Api, Resource, fields
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
bcrypt = Bcrypt(app)

# Initialize CORS with specific origin
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize Flask-RESTX API
api = Api(app, doc='/docs')  # Swagger documentation at /docs

# JWT Secret Key
SECRET_KEY = app.config['SECRET_KEY']

# Define models for validation
user_model = api.model('User', {
    'username': fields.String(required=True, description='The username'),
    'email': fields.String(required=True, description='The user email'),
    'phone': fields.String(description='The user phone number'),
    'password': fields.String(required=True, description='The user password'),
    'role': fields.String(description='The user role', default='user')
})

login_model = api.model('Login', {
    'username': fields.String(required=True, description='The username'),
    'password': fields.String(required=True, description='The user password')
})

discussion_model = api.model('Discussion', {
    'topic': fields.String(required=True, description='Discussion topic'),
    'content': fields.String(required=True, description='Discussion content'),
    'user_id': fields.Integer(required=True, description='User ID'),
    'course_id': fields.Integer(required=True, description='Course ID')
})

course_model = api.model('Course', {
    'name': fields.String(required=True, description='Course name'),
    'description': fields.String(description='Course description'),
    'price': fields.Float(required=True, description='Course price'),
    'rating': fields.Float(description='Course rating')
})

payment_model = api.model('Payment', {
    'user_id': fields.Integer(required=True, description='User ID'),
    'course_id': fields.Integer(required=True, description='Course ID'),
    'amount': fields.Float(required=True, description='Payment amount'),
    'method_of_payment': fields.String(required=True, description='Payment method'),
    'card_number': fields.String(description='Card number'),
    'expiry_date': fields.String(description='Card expiry date'),
    'cvv': fields.String(description='Card CVV'),
    'phone_number': fields.String(description='Phone number'),
    'mpesa_reference': fields.String(description='Mpesa reference')
})

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return {'message': 'Token is missing!'}, 403
        try:
            token = token.split(" ")[1]
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return {'message': 'Token has expired!'}, 403
        except jwt.InvalidTokenError:
            return {'message': 'Invalid token!'}, 403
        return f(*args, **kwargs)
    return decorated_function

# UserResource
@api.route('/users', '/users/<int:user_id>')
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

    @api.expect(user_model)
    @token_required
    def post(self):
        data = api.payload
        try:
            User.validate_email(data['email'])
            User.validate_phone(data.get('phone'))
            User.validate_password(data['password'])
            User.validate_username(data['username'])
        except ValueError as e:
            return {'message': str(e)}, 400

        new_user = User(
            username=data['username'],
            email=data['email'],
            phone=data.get('phone'),
            password=bcrypt.generate_password_hash(data['password']).decode('utf-8'),
            role=data.get('role', 'user')
        )
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201

    @api.expect(user_model)
    @token_required
    def patch(self, user_id):
        user = User.query.get(user_id)
        if user:
            data = api.payload
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

# DiscussionResource
@api.route('/discussions', '/discussions/<int:discussion_id>')
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

    @api.expect(discussion_model)
    @token_required
    def post(self):
        data = api.payload
        new_discussion = Discussion(
            topic=data['topic'],
            content=data['content'],
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

# CourseResource
@api.route('/courses', '/courses/<int:course_id>')
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

    @api.expect(course_model)
    @token_required
    def post(self):
        data = api.payload
        new_course = Course(
            name=data['name'],
            description=data.get('description'),
            price=data['price'],
            rating=data.get('rating')
        )
        db.session.add(new_course)
        db.session.commit()
        return {'message': 'Course created successfully'}, 201

    @api.expect(course_model)
    @token_required
    def patch(self, course_id):
        course = Course.query.get(course_id)
        if course:
            data = api.payload
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

# PaymentResource
@api.route('/payments')
class PaymentResource(Resource):
    @api.expect(payment_model)
    @token_required
    def post(self):
        data = api.payload
        Payment.validate_payment_method(
            method_of_payment=data['method_of_payment'],
            card_number=data.get('card_number'),
            expiry_date=data.get('expiry_date'),
            cvv=data.get('cvv'),
            phone_number=data.get('phone_number'),
            mpesa_reference=data.get('mpesa_reference')
        )
        new_payment = Payment(
            user_id=data['user_id'],
            course_id=data['course_id'],
            amount=data['amount'],
            method_of_payment=data['method_of_payment'],
            card_number=data.get('card_number'),
            expiry_date=data.get('expiry_date'),
            cvv=data.get('cvv'),
            phone_number=data.get('phone_number'),
            mpesa_reference=data.get('mpesa_reference')
        )
        db.session.add(new_payment)
        db.session.commit()
        return {'message': 'Payment processed successfully'}, 201

# Add resources to API
api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(DiscussionResource, '/discussions', '/discussions/<int:discussion_id>')
api.add_resource(CourseResource, '/courses', '/courses/<int:course_id>')
api.add_resource(PaymentResource, '/payments')

if __name__ == '__main__':
    app.run(debug=True)
