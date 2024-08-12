// src/Home.js
import React from 'react';
import Footer from './Footer';
import SearchBar from './SearchBar';

function Home({ onSearch }) {
  return (
    <div>
      <div className='home-page'>
        <div>
          <SearchBar/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
