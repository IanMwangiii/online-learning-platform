from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  # Update with your actual database URI
app.config['SECRET_KEY'] = 'your_secret_key_here'

db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app)
bcrypt = Bcrypt(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'email': self.email
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Discussion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(120), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)

class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)

# Resources
class UserAuthResource(Resource):
    def post(self, action):
        data = request.get_json()
        if action == "signup":
            hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            new_user = User(username=data['username'], name=data['name'], email=data['email'], password=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            return {'message': 'User signed up successfully'}, 201
        elif action == "login":
            user = User.query.filter_by(email=data['email']).first()
            if user and bcrypt.check_password_hash(user.password, data['password']):
                return {'message': 'Login successful', 'user_id': user.id}, 200
            return {'message': 'Invalid email or password'}, 401

class UserProfileResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user:
            return jsonify(user.to_dict())
        return {'message': 'User not found'}, 404

    def put(self, user_id):
        data = request.get_json()
        user = User.query.get(user_id)
        if user:
            user.username = data.get('username', user.username)
            user.name = data.get('name', user.name)
            user.email = data.get('email', user.email)
            db.session.commit()
            return {'message': 'User profile updated successfully'}
        return {'message': 'User not found'}, 404


# Register routes with API
api.add_resource(UserAuthResource, '/auth/<string:action>')
api.add_resource(UserProfileResource, '/user/<int:user_id>')


if __name__ == '__main__':
    app.run(debug=True, port=5555)
