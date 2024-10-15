import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post('/jobs/users/', data);
      navigate('/login');
    } catch (error) {
      setRegisterError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
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
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>
        {registerError && <div className="text-red-500">{registerError}</div>}
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;