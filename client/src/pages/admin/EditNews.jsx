import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: '',
    summary: '',
    content: '',
    author: '',
    date: '',
    status: 'draft',
    featured: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticle(response.data);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch article');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/news/${id}`, article, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/admin/news');
    } catch (error) {
      setError('Failed to update article');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Edit News Article</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={article.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
          required
        />

        <label className="block mb-2 font-semibold">Summary</label>
        <textarea
          name="summary"
          value={article.summary}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
          required
        ></textarea>

        <label className="block mb-2 font-semibold">Content</label>
        <textarea
          name="content"
          value={article.content}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
          required
        ></textarea>

        <label className="block mb-2 font-semibold">Author</label>
        <input
          type="text"
          name="author"
          value={article.author}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
          required
        />

        <label className="block mb-2 font-semibold">Date</label>
        <input
          type="date"
          name="date"
          value={article.date.split('T')[0]}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
          required
          disabled
        />

        <label className="block mb-2 font-semibold">Status</label>
        <select
          name="status"
          value={article.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
        </select>

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="featured"
            checked={article.featured}
            onChange={handleChange}
            className="mr-2"
          />
          Featured
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Update Article
        </button>
      </form>
    </div>
  );
};

export default EditNews;
