from app import app, db

def drop_db():
    with app.app_context():
        # Drop all tables
        db.drop_all()
        print("All tables dropped.")

if __name__ == "__main__":
    drop_db()