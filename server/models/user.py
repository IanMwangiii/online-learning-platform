from . import db
from sqlalchemy.orm import relationship

class User(db.Model):
    _tablename_ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relationships
    courses = relationship('Course', secondary='enrollment', back_populates='users')
    discussions = relationship('Discussion', back_populates='user')

    def _repr_(self):
        return f'<User {self.name}>'