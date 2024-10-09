import React from 'react';
import { Link } from 'react-router-dom';

function JobPostingCard({ job }) {
  return (
    <div className="bg-white shadow-md rounded-lg  p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
      <p className="text-gray-600 mb-2">{job.company}</p>
      <p className="text-gray-600 mb-2">{job.location} {job.remote && '(Remote)'}</p>
      <p className="text-gray-600 mb-4">${job.salary.min} - ${job.salary.max} per year</p>
      <Link to={`/job-postings/${job.id}`} className="text-blue-600 hover:underline">View Details</Link>
    </div>
  );
}

export default JobPostingCard;