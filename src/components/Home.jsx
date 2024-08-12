import './App.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Online Learning Platform</h1>
      <p>Explore our courses and start learning today!</p>
      <div className="home-buttons">
        <button className="explore-button">Explore Courses</button>
        <button className="join-button">Join Us</button>
      </div>
    </div>
  );
}

export default Home;