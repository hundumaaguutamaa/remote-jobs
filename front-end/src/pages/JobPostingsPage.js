import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import JobPostingCard from '../components/JobPostingCard';
import SearchBar from '../components/SearchBar';

function JobPostingsPage() {
  const [jobPostings, setJobPostings] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const locationQuery = searchParams.get('location') || '';
  const jobType = searchParams.get('jobType') || '';
  const salaryRange = searchParams.get('salaryRange') || '';

  const fetchJobs = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      // In a real application, this would be an API call to your Django backend
      // For now, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated job data
      const newJobs = Array(10).fill().map((_, index) => ({
        id: jobPostings.length + index + 1,
        title: `Job Title ${jobPostings.length + index + 1}`,
        company: `Company ${jobPostings.length + index + 1}`,
        location: ['San Francisco', 'New York', 'Remote'][Math.floor(Math.random() * 3)],
        remote: Math.random() > 0.5,
        salary: {
          min: Math.floor(Math.random() * 50000) + 50000,
          max: Math.floor(Math.random() * 100000) + 100000
        },
        jobType: ['Full-time', 'Part-time', 'Contract', 'Internship'][Math.floor(Math.random() * 4)]
      }));

      setJobPostings(prev => [...prev, ...newJobs]);
      setPage(prev => prev + 1);
      setHasMore(newJobs.length === 10);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, jobPostings.length]);

  useEffect(() => {
    setJobPostings([]);
    setPage(1);
    setHasMore(true);
    fetchJobs();
  }, [query, locationQuery, jobType, salaryRange]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      fetchJobs();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchJobs, loading]);

  const filteredJobs = jobPostings.filter(job => {
    const matchesQuery = job.title.toLowerCase().includes(query.toLowerCase()) ||
                         job.company.toLowerCase().includes(query.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
                            (locationQuery.toLowerCase() === 'remote' && job.remote);
    const matchesJobType = !jobType || job.jobType.toLowerCase() === jobType.toLowerCase();
    const matchesSalary = !salaryRange || (
      salaryRange === '150000+' ? job.salary.max >= 150000 :
      job.salary.min >= parseInt(salaryRange.split('-')[0]) &&
      job.salary.max <= parseInt(salaryRange.split('-')[1])
    );
    return matchesQuery && matchesLocation && matchesJobType && matchesSalary;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Jobs</h1>
      <div className="mb-8">
        <SearchBar />
      </div>
      <div className="space-y-6">
        {filteredJobs.map(job => (
          <JobPostingCard key={job.id} job={job} />
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading more jobs...</p>}
      {!hasMore && <p className="text-center mt-4">No more jobs to load.</p>}
      {filteredJobs.length === 0 && !loading && (
        <p className="text-center text-gray-600 mt-8">No job postings found matching your search criteria.</p>
      )}
    </div>
  );
}

export default JobPostingsPage;