import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, DollarSign } from 'lucide-react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      query: query,
      location: location,
      jobType: jobType,
      salaryRange: salaryRange
    });
    navigate(`/job-postings?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center border rounded-md overflow-hidden">
          <Search className="ml-2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 focus:outline-none"
          />
        </div>
        <div className="flex items-center border rounded-md overflow-hidden">
          <MapPin className="ml-2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder='City, state, zip code, or "remote"'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 focus:outline-none"
          />
        </div>
        <div className="flex items-center border rounded-md overflow-hidden">
          <Briefcase className="ml-2 text-gray-400" size={20} />
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full p-2 focus:outline-none"
          >
            <option value="">All Job Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div className="flex items-center border rounded-md overflow-hidden">
          <DollarSign className="ml-2 text-gray-400" size={20} />
          <select
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            className="w-full p-2 focus:outline-none"
          >
            <option value="">All Salary Ranges</option>
            <option value="0-50000">$0 - $50,000</option>
            <option value="50000-100000">$50,000 - $100,000</option>
            <option value="100000-150000">$100,000 - $150,000</option>
            <option value="150000+">$150,000+</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Search Jobs
      </button>
    </form>
  );
}

export default SearchBar;