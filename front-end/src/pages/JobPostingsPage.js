import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import JobPostingCard from '../components/JobPostingCard';
import SearchBar from '../components/SearchBar';

function JobPostingsPage() {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const locationQuery = searchParams.get('location') || '';
  const jobType = searchParams.get('jobType') || '';
  const salaryRange = searchParams.get('salaryRange') || '';

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/jobs/jobs/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobPostings(data.results);
        setTotalCount(data.count);
      } catch (e) {
        setError('Failed to fetch jobs. Please try again later.');
        console.error('Error fetching jobs:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobPostings.filter(job => {
    const matchesQuery = job.title.toLowerCase().includes(query.toLowerCase()) ||
                         job.company.toLowerCase().includes(query.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(locationQuery.toLowerCase());
    // Add more filters here if your backend provides job type and salary information
    return matchesQuery && matchesLocation;
  });

  if (loading) {
    return <div className="text-center mt-8">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Job Postings</h1>
      <div className="mb-8">
        <SearchBar />
      </div>
      <p className="mb-4">Total jobs found: {totalCount}</p>
      <div className="space-y-6">
        {filteredJobs.map(job => (
          <JobPostingCard key={job.id} job={job} />
        ))}
      </div>
      {filteredJobs.length === 0 && (
        <p className="text-center text-gray-600 mt-8">No job postings found matching your search criteria.</p>
      )}
    </div>
  );
}

export default JobPostingsPage;