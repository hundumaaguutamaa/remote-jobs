import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Job Board
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/job-postings" className="hover:underline">Job Postings</Link></li>
            <li><Link to="/post-job" className="hover:underline">Post a Job</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link to="/profile" className="hover:underline">Profile</Link></li>
                <li><button onClick={handleLogout}   className="hover:underline">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:underline">Login</Link></li>
                <li><Link to="/register" className="hover:underline">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;