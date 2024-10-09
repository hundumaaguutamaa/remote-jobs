import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JobPostingForm() {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    url: '',
    source: 'Employer Post', // Default source for employer posts
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/jobs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication header here if required
        },
        body: JSON.stringify({
          ...jobData,
          posted_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        alert('Job posted successfully!');
        navigate('/job-postings');
      } else {
        throw new Error('Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={jobData.title}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          required
          value={jobData.company}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          required
          value={jobData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        ></textarea>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          required
          value={jobData.location}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">Job URL</label>
        <input
          type="url"
          id="url"
          name="url"
          required
          value={jobData.url}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Post Job
        </button>
      </div>
    </form>
  );
}

export default JobPostingForm;