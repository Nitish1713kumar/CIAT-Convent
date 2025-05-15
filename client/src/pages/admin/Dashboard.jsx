import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

// Admin components
import StatsCard from './StatsCard';

const Dashboard = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    newsCount: 0,
    eventsCount: 0,
    admissionsCount: 0,
    galleryItemsCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [events, setEvents] = useState([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchGalleryItems();
      fetchNewsArticles();
      fetchEvents();
    }
  }, [isAuthenticated, navigate]);
  
  // ✅ Run fetchDashboardData after galleryItems is updated
  useEffect(() => {
    if (galleryItems.length > 0) {
      fetchDashboardData();
    }
  }, [galleryItems]);

  const fetchGalleryItems = async () => {
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/gallery`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGalleryItems(response.data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      // setError('Failed to load gallery items. Please try again later.');
    } finally {
      // setIsLoading(false);
    }
  };

  const fetchNewsArticles = async () => {
    setIsLoading(true);
    try {
      
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/news`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    
      setNewsArticles(response.data);
    } catch (error) {
      console.error('Error fetching news articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data); // Set events from API response
      // Mock data for demonstration
      
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    // This would be replaced with actual API calls
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      //filter events for upcoming events
      const futureEvents = events.filter(event => new Date(event.date) > new Date());
      
      // Mock data for demonstration
      setStats({
        newsCount: newsArticles.length,
        eventsCount: futureEvents.length,
        admissionsCount: 85,
        galleryItemsCount: galleryItems.length
      });
     
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  


  return (
    <div className="container mx-auto px-4 py-8 pt-40">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name || 'Administrator'}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={fetchDashboardData} 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
          >
            Refresh Data
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Notice Board" 
          count={stats.newsCount} 
          icon="📰" 
          linkTo="/admin/news"
          color="bg-blue-500"
        />
        {/*
        <StatsCard 
          title="Upcoming Events" 
          count={stats.eventsCount} 
          icon="🗓️" 
          linkTo="/admin/events"
          color="bg-green-500"
        />
        
        <StatsCard 
          title="Admission Applications" 
          count={stats.admissionsCount} 
          icon="📝" 
          linkTo="/admin/admissions"
          color="bg-amber-500"
        />
        */}
        <StatsCard 
          title="Gallery Items" 
          count={stats.galleryItemsCount} 
          icon="🖼️" 
          linkTo="/admin/gallery"
          color="bg-purple-500"
        />
      </div>
      

      {/* Admin Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Admin RuleBook</h2>
            
          <div className="bg-gray-50 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">1. Overview</h3>
            <p className="text-gray-700 mb-4">
              This rulebook provides guidelines for administrators to manage events effectively within the system. It covers event creation, editing, publishing, and deletion processes while ensuring compliance with organizational policies.
            </p>
            <h3 className="text-lg font-semibold mb-2">2. Access and Authentication</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li className="mb-2">Only authorized administrators can manage events.</li>
              <li className="mb-2">Admins must log in using their credentials before making any changes.</li>
              <li className="text-gray-700 mb-4">Any suspicious login activity should be reported immediately to IT support.</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2">3. Troubleshooting & Support</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li className="mb-2">If you experience any issues, contact Technical Support.</li>
              <li className="mb-2">For user access problems, reach out to IT Security.</li>
              <li className="text-gray-700 mb-4">Report any system bugs to the Development Team.</li>
            </ul>
          </div>

          
          {/* 
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All Activity
            </button>
          </div>
           */}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link 
              to="/admin/news/create" 
              className="block w-full text-left px-4 py-3 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition"
            >
              Add New Notice Article
            </Link>
            {/*
            <Link 
              to="/admin/events/create" 
              className="block w-full text-left px-4 py-3 rounded-md bg-green-50 hover:bg-green-100 text-green-700 font-medium transition"
            >
            Create New Event
            </Link>
            */}
            <Link 
              to="/admin/gallery/upload" 
              className="block w-full text-left px-4 py-3 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium transition"
            >
              Upload to Gallery
            </Link>
            {/*
              <Link 
              to="/admin/admissions/review" 
              className="block w-full text-left px-4 py-3 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium transition"
            >
              Review Admissions
            </Link>
            */}
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">System Information</h3>
            <div className="bg-gray-50 rounded-md p-4 text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Last Version:</span>
                <span className="font-medium">March 5, 2025</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Database Used:</span>
                <span className="text-green-600 font-medium">Mongo and Cloudnairy</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">System Version:</span>
                <span className="font-medium">v.0.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">System Developer:</span>
                <a href='https://www.linkedin.com/in/vinaygupta-nitjsr/' className="text-blue-600 hover:text-blue-800">
                  <span className="font-medium">SAURABH SITHKAR</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
