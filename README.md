
# 📚 Online Learning Platform

An intuitive and modern online learning platform where users can enroll in courses, track their progress, and participate in discussions. This project leverages the power of Flask for the backend and React with Vite for a fast and responsive frontend experience.

## 🚀 Features

- *Backend with Flask & SQLAlchemy*: 
  - Robust backend infrastructure using Flask.
  - SQLAlchemy for ORM, handling database interactions seamlessly.
  - Models include User, Course, Lesson, and Discussion with many-to-many relationships between User and Course.
  
- *Frontend with React & Vite*:
  - Blazing fast frontend powered by React and Vite.
  - Routes include Course Catalog, Course Details, Lesson View, Discussion Forums, and User Dashboard.
  - Modular design with reusable components for scalability.

- *CRUD Operations*:
  - Full CRUD capabilities for courses and lessons.
  - Instructors can easily create, update, and delete course content.

- *State Management*:
  - Efficient state management using useContext or Redux to handle course enrollments and lesson progress.

- *Video Streaming Integration*:
  - Seamless integration with a video streaming service API to deliver course videos.

- *Validation & Error Handling*:
  - Comprehensive form validations and error handling to ensure a smooth user experience.

## 🛠️ Tech Stack

- *Frontend*:
  - React
  - Vite
  - React Router
  - useContext / Redux

- *Backend*:
  - Flask
  - SQLAlchemy

- *Database*:
  - PostgreSQL / SQLite

- *Video Streaming API*:
  - [Your chosen service: YouTube, Vimeo, etc.]

## 🎨 Figma Design

Check out the Figma design for the project [https://www.figma.com/design/9kYF7xnk1NaKjsPKxjb5AT/Online-Learning-Platform?node-id=34-2&t=H7x9JgPFpMdssC7U-0](#).

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/)
- [PostgreSQL](https://www.postgresql.org/) or [SQLite](https://www.sqlite.org/)

### Installation

1. *Clone the Repository*:
   bash
   git clone https://github.com/IanMwangiii/online-learning-platform
   cd online-learning-platform
   

2. *Backend Setup*:
   - Create a virtual environment:
     bash
     python3 -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     
   - Install dependencies:
     bash
     pip install -r requirements.txt
     
   - Set up the database:
     bash
     flask db init
     flask db migrate
     flask db upgrade
     
   - Run the backend server:
     bash
     flask run
     

3. *Frontend Setup*:
   - Navigate to the frontend directory:
     bash
     cd client
     
   - Install dependencies:
     bash
     npm install
     
   - Start the development server:
     bash
     npm run dev
     

4. *Access the Application*:
   - Open your browser and navigate to http://localhost:3000 to access the frontend.
   - The backend server will run at http://localhost:5000.

## 📂 Project Structure


online-learning-platform/
│
├── client/                  # Frontend (React with Vite)
│   ├── public/              # Public assets
│   └── src/                 # React source code
│       ├── components/      # Reusable components
│       ├── pages/           # Page components
│       ├── context/         # Context providers (useContext)
│       └── App.jsx          # Main app component
│
├── server/                  # Backend (Flask)
│   ├── models/              # SQLAlchemy models
│   ├── routes/              # Flask routes
│   └── app.py               # Main application entry point
│
├── migrations/              # Database migrations
├── venv/                    # Virtual environment
├── requirements.txt         # Python dependencies
└── README.md                # Project README


## 💡 Usage

- *Enrolling in Courses*: Users can browse the course catalog and enroll in their desired courses.
- *Learning Lessons*: Once enrolled, users can view lessons, including video content, and track their progress.
- *Participating in Discussions*: Users can engage in course-related discussions to enhance their learning experience.

## 🔧 Development

### Running Tests

To run the test suite:

bash
# Backend tests
pytest

# Frontend tests
npm run test


### Building for Production

To create a production-ready build:

bash
# Frontend build
npm run build

# Serve the production build
npm run serve


## 🌟 Contributions

Contributions are welcome! Please submit a pull request or open an issue for discussion.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy coding! 🎉

---

