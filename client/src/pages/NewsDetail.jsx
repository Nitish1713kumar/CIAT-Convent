import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowLeft, FiShare2, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import axios from 'axios';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {

    
    const fetchNewsDetail = async () => {
      try {
       
          const token = localStorage.getItem('token');
          const response = await axios.get(  `${import.meta.env.VITE_API_BASE_URL}/api/news`, {
            headers: { Authorization: `Bearer ${token}` }
          });
       


          const selectedNews = response.data.find(item => item._id === id);
      
          const related = response.data
            .filter(item => item._id !== id)
            .slice(0, 2);
          
          setNews(selectedNews);
          setRelatedNews(related);
          setLoading(false);
        

        // In production, use the following:
        /*
        const response = await axios.get(`/api/news/${id}`);
        const relatedRes = await axios.get(`/api/news/related/${id}?limit=2`);
        
        setNews(response.data);
        setRelatedNews(relatedRes.data);
        setLoading(false);
        */
      } catch (error) {
        console.error('Error fetching news detail:', error);
        setLoading(false);
      }
    };

    fetchNewsDetail();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  
  if (loading) {
    return (
      <div className="pt-30 flex justify-center items-center" style={{ minHeight: '50vh' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="pt-30 container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">News article not found</h2>
        <p className="text-gray-600 mb-8">The news article you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/news"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-#FFAB00 rounded-md hover:bg-primary-700 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Notice Board
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-primary-600 py-20 text-#FFAB00">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block text-primary-100 mb-4">
            <Link to="/news" className="inline-flex items-center hover:underline">
              <FiArrowLeft className="mr-2" /> Back to Notice Board
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
          <div className="flex justify-center items-center text-sm text-primary-100">
            <FiCalendar className="mr-2" />
            {new Date(news.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            <span className="mx-2">•</span>
            <span>{news.category}</span>
            <span className="mx-2">•</span>
            <span>By {news.author}</span>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-#FFAB00 rounded-lg overflow-hidden shadow-md mb-10"
            >
              {/* Featured Image */}
              <div className="h-96 overflow-hidden">
                <img
                  src={'https://m.media-amazon.com/images/I/81Wsge2wb8L.jpg'}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
              </div>
              
              {/* Share Buttons */}
              <div className="bg-gray-100 p-4 flex justify-center items-center">

                <Link
                  to="/news"
                  className="inline-flex items-center text-primary-600 hover:underline"
                >
                  Back to Notice Board<FiArrowLeft className="ml-2" />
                </Link>
              </div>
            </motion.div>
            
            

            {/* Related News */}
            {relatedNews.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Related News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedNews.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-#FFAB00 rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow"
                    >
                      <Link to={`/news/${item._id}`}>
                        <div className="h-48 overflow-hidden">
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
                          <div className="text-primary-600 font-medium inline-flex items-center">
                            Read More <FiArrowLeft className="ml-1 rotate-180" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;