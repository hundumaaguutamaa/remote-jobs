import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  const [csrfToken, setCsrfToken] = useState(''); // Store the CSRF token here
  const navigate = useNavigate();

  // Helper function to get CSRF token from cookies (backup method)
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  // On form submission
  const onSubmit = async (data) => {
    try {
      const csrftoken = csrfToken || getCookie('csrftoken');  // Use state or fallback to cookie

      // Make API request with CSRF token in headers
      const response = await api.post('/accounts/login/', data, {
        headers: {
          'X-CSRFToken': csrftoken,  // Include CSRF token in headers
        }
      });

      // Store the token in localStorage and redirect
      localStorage.setItem('token', response.data.key);
      navigate('/');
    } catch (error) {
      // Handle error (403 Forbidden or invalid login credentials)
      if (error.response && error.response.status === 403) {
        setLoginError('CSRF token missing or incorrect. Please reload the page and try again.');
      } else {
        setLoginError('Invalid email or password');
      }
    }
  };

  // Fetch CSRF token from the backend on component mount
  useEffect(() => {
    api.get('/accounts/login/')
      .then((response) => {
        const csrftoken = response.data.csrfToken;
        setCsrfToken(csrftoken);  // Save CSRF token in state
        localStorage.setItem('csrftoken', csrftoken);  // Optionally store in localStorage
      })
      .catch((error) => {
        console.error('Error fetching CSRF token:', error);
      });
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        {loginError && <div className="text-red-500">{loginError}</div>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
      </form>
      <div className="mt-4">
        <a href="/accounts/google/login/" className="block w-full bg-red-500 text-white py-2 rounded text-center">
          Login with Google
        </a>
      </div>
    </div>
  );
}

export default Login;
