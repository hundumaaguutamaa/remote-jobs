import React from 'react';
import { useParams } from 'react-router-dom';

function JobPostingDetailPage() {
  const { id } = useParams();

  // This is mock data. In a real application, you would fetch this from an API based on the id.
  const job = {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Co',
    location: 'San Francisco',
    remote: true,
    salary: { min: 100000, max: 150000 },
    description: 'We are looking for a talented software engineer to join our team...',
    responsibilities: 'Develop and maintain web applications, collaborate with cross-functional teams...',
    requirements: 'Bachelor\'s degree in Computer Science, 3+ years of experience in web development...',
    benefits: 'Competitive salary, health insurance, 401(k) matching, flexible work hours...',
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <h2 className="text-xl text-gray-600 mb-4">{job.company}</h2>
      <p className="mb-4">{job.location} {job.remote && '(Remote)'}</p>
      <p className="mb-6">${job.salary.min} - ${job.salary.max} per year</p>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Job Description</h3>
        <p>{job.description}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Responsibilities</h3>
        <p>{job.responsibilities}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Requirements</h3>
        <p>{job.requirements}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Benefits</h3>
        <p>{job.benefits}</p>
      </section>

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Apply Now
      </button>
    </div>
  );
}

export default JobPostingDetailPage;