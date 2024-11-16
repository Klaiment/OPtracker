'use client';

import { useState } from 'react';
import '../app/styles/components/searchbar.css';

/**
 * SearchBar component for filtering and searching torrents
 * Includes category selection and search input
 */
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching:', searchTerm, 'in category:', category);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="applications">Applications</option>
          <option value="games">Games</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Search torrents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar; 