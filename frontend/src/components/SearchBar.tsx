// src/components/SearchBar.tsx
import React from 'react';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  return (
    <div className="relative w-1/3 max-w-sm">
      <input
        type="text"
        placeholder="Search for blooms..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d697b8] transition duration-300"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default SearchBar;