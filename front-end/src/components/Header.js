import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Job Board
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/job-postings" className="hover:underline">Job Postings</Link></li>
            <li><Link to="/job-postings/new" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">Post a Job</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;