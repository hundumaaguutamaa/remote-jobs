import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
    const [jobs, setJobs] = useState([]);  // List of jobs
    const [loading, setLoading] = useState(true);  // Loading state
    const [currentPage, setCurrentPage] = useState(1);  // Track the current page
    const [hasNextPage, setHasNextPage] = useState(false);  // Track if more jobs exist

    // Fetch jobs when the component mounts or currentPage changes
    useEffect(() => {
        loadJobs();
    }, [currentPage]);

    // Load jobs from the API for the current page
    const loadJobs = () => {
        setLoading(true);
        axios.get(`http://localhost:8000/jobs/?page=${currentPage}`)
            .then(response => {
                setJobs(prevJobs => [...prevJobs, ...response.data.jobs]);  // Append new jobs
                setHasNextPage(response.data.has_next);  // Determine if there are more jobs
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching jobs", error);
                setLoading(false);
            });
    };

    // Scroll detection: Load more jobs when user scrolls near the bottom
    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;
            
            // Check if user has scrolled near the bottom (100px buffer)
            if (scrollTop + clientHeight >= scrollHeight - 100 && !loading && hasNextPage) {
                setCurrentPage(prevPage => prevPage + 1);  // Trigger loading of the next page
            }
        };

        // Add event listener for scroll
        window.addEventListener('scroll', handleScroll);

        // Cleanup scroll event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasNextPage]);

    return (
        <div className="job-list">
            <h1>Remote Job Listings</h1>

            {/* Job cards */}
            <div className="jobs">
                {jobs.map(job => (
                    <div key={job.url} className="job-card">
                        <h2>{job.title}</h2>
                        <p><strong>Company:</strong> {job.company}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Source:</strong> {job.source}</p>
                        <a href={job.url} target="_blank" rel="noopener noreferrer">
                            View Job
                        </a>
                    </div>
                ))}
            </div>

            {/* Loading spinner */}
            {loading && <p>Loading jobs...</p>}
        </div>
    );
};

export default JobList;
