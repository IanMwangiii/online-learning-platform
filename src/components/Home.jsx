import PropTypes from 'prop-types';
import Footer from './Footer';
import SearchBar from './SearchBar';

function Home({ onSearch }) {
  return (
    <div>
      <div className='home-page'>
        <div>
          <SearchBar onSearch={onSearch} /> {/* Pass onSearch to SearchBar */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Define PropTypes for the Home component
Home.propTypes = {
  onSearch: PropTypes.func.isRequired, // Ensures onSearch is a required function
};

export default Home;
