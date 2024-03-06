// src/App.js
import React from 'react';
// import './index.css'; // Import the modified index.css file

const SearchForm = () => {
  const clearInput = () => {
    const input = document.getElementById('search-input');
    input.value = '';
  };

  return (
    <form className="w-32 h-6">
      <input type="search" id="search-input" className='rounded-lg border-2 border-gray-700 outline-none px-3'
        // className=" top-0 left-0 w-full h-42.5px line-height-30px outline-none border-0 font-size-1em border-radius-20px p-0 20px"
      />
      {/* <i className="fa fa-search box-border p-10 w-42.5px h-42.5px absolute top-0 right-0 border-radius-full text-center text-red-600 bg-07051a font-size-1.2em transition-all duration-1000 hover:bg-white hover:text-07051a"></i> */}
      {/* <a href='*'
        // className="hidden absolute top-70px bottom-0 left-0 right-0 font-size-20px text-white text-center width-100%"
        onClick={clearInput}
      >
        Clear
      </a> */}
    </form>
  );
};

export default SearchForm;
