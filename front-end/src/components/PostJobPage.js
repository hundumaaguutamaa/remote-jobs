import React from 'react';
import JobPostingForm from '../components/JobPostingForm';

function PostJobPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
      <JobPostingForm />
    </div>
  );
}

export default PostJobPage;