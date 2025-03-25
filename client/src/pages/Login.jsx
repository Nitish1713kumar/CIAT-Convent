import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      if (credentials.email === import.meta.env.VITE_ADMIN_EMAIL && credentials.password === import.meta.env.VITE_ADMIN_PASSWORD) {
        const success = await login({ id: '1', name: 'Admin User', email: credentials.email, password: credentials.password , role: 'admin' });
        if (success){
          navigate('/admin/dashboard');
        }
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <motion.div 
        className="w-full max-w-md bg-#FFAB00 rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-blue-800 py-6 px-4 text-center">
          <h1 className="text-2xl font-bold text-#FFAB00">Admin Login</h1>
          <p className="text-blue-100 text-sm">Staff and Administrator Access Only</p>
        </div>

        <div className="p-6">
          {error && (
            <motion.div 
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-800 hover:bg-blue-900 text-#FFAB00 font-bold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-gray-600 text-sm">
            <p>For login assistance, please contact the IT department.</p>
            <p className="mt-2">
              <Link to="/" className="text-blue-800 hover:text-blue-900">← Return to Homepage</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
