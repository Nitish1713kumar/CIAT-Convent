import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateNews = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    status: 'draft',
    featured: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/news`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/admin/news');
    } catch (error) {
      console.error('Error creating news article:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create News Article</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Summary</label>
          <input type="text" name="summary" value={formData.summary} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Content</label>
          <textarea name="content" value={formData.content} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md h-32"></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Author</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        <div className="mb-6 flex items-center">
          <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="mr-2" />
          <label className="text-gray-700 font-medium">Featured</label>
        </div>

        <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
          {isSubmitting ? 'Submitting...' : 'Create Article'}
        </button>
      </form>
    </div>
  );
};

export default CreateNews;
