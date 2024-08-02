from . import db

class Enrollment(db.Model):
    _tablename_ = 'enrollment'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), primary_key=True)
    enrolled_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    # Relationships
    user = db.relationship('User', back_populates='courses')
    course = db.relationship('Course', back_populates='users')

    def _repr_(self):
        return f'<Enrollment User: {self.user_id}, Course: {self.course_id}>'