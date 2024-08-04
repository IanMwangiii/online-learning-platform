from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from models.models import db
from app_config import DevelopmentConfig

app = Flask(__name__)

app.config.from_object(DevelopmentConfig)

db.init_app(app)

migrate = Migrate(app, db)
api = Api(app)
CORS(app)
bcrypt = Bcrypt(app)

if __name__ == '_main_':
    app.run(debug=True)