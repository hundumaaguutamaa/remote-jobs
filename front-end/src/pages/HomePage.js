import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Job Board</h1>
      <p className="text-xl mb-8">Find your next career opportunity or post a job opening.</p>
      <div className="max-w-3xl mx-auto mb-8">
        <SearchBar />
      </div>
      <div className="space-x-4">
        <Link to="/job-postings" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Browse Jobs
        </Link>
        <Link to="/job-postings/new" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          Post a Job
        </Link>
      </div>
    </div>
  );
}

export default HomePage;