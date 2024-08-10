# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_cors import CORS
# from flask_bcrypt import Bcrypt

# # Initialize the extensions
# db = SQLAlchemy()
# migrate = Migrate()
# cors = CORS()
# bcrypt = Bcrypt()

# def create_app(config_class=None):
#     app = Flask(__name__)

#     # Load configuration
#     if config_class:
#         app.config.from_object(config_class)
#     else:
#         app.config.from_pyfile('config.py')

#     # Initialize extensions
#     db.init_app(app)
#     migrate.init_app(app, db)
#     cors.init_app(app)
#     bcrypt.init_app(app)

#     # Import and register blueprints/routes
#     from .routes import main_bp
#     app.register_blueprint(main_bp)

#     return app