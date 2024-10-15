import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

function PostJobPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/jobs/jobs/', data);
      alert('Job posted successfully!');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Job Title</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Job title is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>
        <div>
          <label htmlFor="company" className="block mb-1">Company</label>
          <input
            type="text"
            id="company"
            {...register('company', { required: 'Company name is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.company && <span className="text-red-500">{errors.company.message}</span>}
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Job Description</label>
          <textarea
            id="description"
            {...register('description', { required: 'Job description is required' })}
            className="w-full px-3 py-2 border rounded"
            rows="5"
          ></textarea>
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>
        <div>
          <label htmlFor="location" className="block mb-1">Location</label>
          <input
            type="text"
            id="location"
            {...register('location', { required: 'Location is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.location && <span className="text-red-500">{errors.location.message}</span>}
        </div>
        <div>
          <label htmlFor="url" className="block mb-1">Application URL</label>
          <input
            type="url"
            id="url"
            {...register('url', { required: 'Application URL is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.url && <span className="text-red-500">{errors.url.message}</span>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Post Job</button>
      </form>
    </div>
  );
}

export default PostJobPage;