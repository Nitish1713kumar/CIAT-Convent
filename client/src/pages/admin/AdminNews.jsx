import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AdminNews = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  useEffect(() => {
    if (isAuthenticated) {
      fetchNewsArticles();
    }
  }, [isAuthenticated]);

  const fetchNewsArticles = async () => {
    setIsLoading(true);
    try {
      
      const token = localStorage.getItem('token');
      const response = await axios.get(  `${import.meta.env.VITE_API_BASE_URL}/api/news`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNewsArticles(response.data);
    } catch (error) {
      console.error('Error fetching news articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/news/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNewsArticles(newsArticles.filter(article => article._id !== id));
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const toggleFeatured = async (id, featured) => {
    try {
      const token = localStorage.getItem('token');
      const updatedArticle = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/news/${id}`, 
        { featured: !featured }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewsArticles(newsArticles.map(article =>
        article._id === id ? { ...article, featured: updatedArticle.data.featured } : article
      ));
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const filteredNews = Array.isArray(newsArticles) ? newsArticles
    .filter(article =>
      (currentFilter === 'all' || article.status === currentFilter) &&
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Notice Board Management</h1>
          <p className="text-gray-600 mt-1">Create, edit, and manage school notice articles</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/admin/news/create"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Create Notice Article
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex space-x-2 mb-4 md:mb-0">
            {['all', 'published', 'draft', 'scheduled'].map(status => (
              <button
                key={status}
                className={`px-4 py-2 rounded-md ${currentFilter === status ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setCurrentFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full md:w-64 px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* News Articles List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredNews.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNews.map(article => (
                  <tr key={article._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{article.summary}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{article.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${article.status === 'published' ? 'bg-green-100 text-green-800' :
                          article.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-purple-100 text-purple-800'}`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleFeatured(article._id, article.featured)}
                        className={`px-2 py-1 rounded text-xs font-semibold
                          ${article.featured ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                            'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                      >
                        {article.featured ? 'Featured' : 'Not Featured'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/admin/news/edit/${article._id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteArticle(article._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No news articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNews;
