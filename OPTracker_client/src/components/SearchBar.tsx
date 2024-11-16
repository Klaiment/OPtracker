'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching:', searchTerm, 'in category:', category);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <form onSubmit={handleSearch} className="flex gap-2 bg-surface p-4 rounded border border-border">
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 bg-background text-text border border-border rounded font-mono"
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
          className="flex-1 p-2 bg-background text-text border border-border rounded font-mono"
        />
        <button 
          type="submit"
          className="px-6 py-2 bg-primary text-background font-semibold rounded hover:bg-primary-dark transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
} 