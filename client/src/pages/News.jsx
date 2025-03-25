import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRight, FiSearch } from 'react-icons/fi';
import axios from 'axios';

const News = () => {

  window.scrollTo(0, 0);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);         
          const token = localStorage.getItem('token');
          const response = await axios.get(  `${import.meta.env.VITE_API_BASE_URL}/api/news`, {
            headers: { Authorization: `Bearer ${token}` }
          });
         

          setNews(response.data);
          setTotalPages(Math.ceil(response.data.length / 6));
          setLoading(false);
        
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    // The actual search is handled in the useEffect
  };

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const newsPerPage = 6;
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const actualTotalPages = Math.ceil(filteredNews.length / newsPerPage);

  return (
    <div className="pt-1">
      {/* Page Header */}
      <section className="bg-primary-600 py-20 text-#FFAB00">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">School Notice Board</h1>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto">
            Stay updated with the latest happenings, achievements, and announcements from our institution.
          </p>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-12 max-w-md mx-auto">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search notice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-primary-600 text-#FFAB00 px-4 py-3 rounded-r-md hover:bg-primary-700 transition-colors"
              >
                <FiSearch className="text-xl" />
              </button>
            </form>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : currentNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentNews.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-#FFAB00 rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow"
                >
                  <Link to={`/news/${item._id}`}>
                    <div className="h-52 overflow-hidden">
                      <img
                        src={'https://m.media-amazon.com/images/I/81Wsge2wb8L.jpg'}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <FiCalendar className="mr-2" />
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.summary}
                      </p>
                      <div className="text-primary-600 font-medium inline-flex items-center">
                        Read More <FiArrowRight className="ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No items found matching your search.</h3>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 px-6 py-2 bg-primary-600 text-#FFAB00 rounded-md hover:bg-primary-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Pagination */}
          {!loading && actualTotalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-l-md border border-gray-300 ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-#FFAB00 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                
                {[...Array(actualTotalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 border-t border-b border-gray-300 ${
                      currentPage === i + 1
                        ? 'bg-primary-600 text-#FFAB00'
                        : 'bg-#FFAB00 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, actualTotalPages))}
                  disabled={currentPage === actualTotalPages}
                  className={`px-4 py-2 rounded-r-md border border-gray-300 ${
                    currentPage === actualTotalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-#FFAB00 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Sign Up */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
          📌 "Stay informed, stay inspired, stay involved!"
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Knowledge empowers, motivation drives action, and engagement builds strong communities. Keep up with the latest updates, share ideas, and be a part of something great!
          </p>
          
        </div>
      </section>
    </div>
  );
};

export default News;