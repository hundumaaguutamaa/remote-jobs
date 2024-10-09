import React from 'react';
import JobPostingForm from '../components/JobPostingForm';

function NewJobPostingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Job Posting</h1>
      <JobPostingForm />
    </div>
  );
}

export default NewJobPostingPage;