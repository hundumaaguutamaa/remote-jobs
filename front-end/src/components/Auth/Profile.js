import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';

function Profile() {
  const [user, setUser] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/jobs/users/me/');
        setUser(response.data);
        setValue('username', response.data.username);
        setValue('email', response.data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/jobs/users/${user.id}/`, data);
      setUpdateSuccess('Profile updated successfully');
      setUpdateError('');
    } catch (error) {
      setUpdateError('Failed to update profile');
      setUpdateSuccess('');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await api.delete(`/jobs/users/${user.id}/`);
        localStorage.removeItem('token');
        window.location.href = '/';
      } catch (error) {
        setUpdateError('Failed to delete account');
      }
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            type="text"
            id="username"
            {...register('username', { required: 'Username is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.username && <span className="text-red-500">{errors.username.message}</span>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        {updateError && <div className="text-red-500">{updateError}</div>}
        {updateSuccess && <div className="text-green-500">{updateSuccess}</div>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Update Profile</button>
      </form>
      <button onClick={handleDelete} className="w-full bg-red-500 text-white py-2 rounded mt-4">Delete Account</button>
    </div>
  );
}

export default Profile;