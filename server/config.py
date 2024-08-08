import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration with default settings."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_default_secret_key')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = False
    TESTING = False
    CORS_HEADERS = 'Content-Type'

class DevelopmentConfig(Config):
    """Development environment configuration."""
    DEBUG = True
    # Ensure the database name is 'app' in the development environment
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URL', 'sqlite:///app_dev.db')
    ENV = 'development'

class TestingConfig(Config):
    """Testing environment configuration."""
    TESTING = True
    # Ensure the database name is 'app' in the testing environment
    SQLALCHEMY_DATABASE_URI = os.getenv('TEST_DATABASE_URL', 'sqlite:///app_test.db')
    ENV = 'testing'

class ProductionConfig(Config):
    """Production environment configuration."""
    # Ensure the database name is 'app' in the production environment
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    ENV = 'production'
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

def get_config(env=None):
    """Returns the appropriate configuration based on the environment."""
    if env is None:
        env = os.getenv('FLASK_ENV', 'default')
    return config.get(env, Config)
