import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const AdminGallery = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentView, setCurrentView] = useState('grid');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchGalleryItems();
    }
  }, [isAuthenticated]);

  const fetchGalleryItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/gallery`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGalleryItems(response.data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      setError('Failed to load gallery items. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGalleryItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/gallery/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGalleryItems(galleryItems.filter(item => item._id !== id));
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        alert('Failed to delete gallery item. Please try again.');
      }
    }
  };

  const toggleFeatured = async (id) => {
    try {
      const item = galleryItems.find(item => item._id === id);
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/gallery/${id}`,
        { featured: !item.featured },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setGalleryItems(
        galleryItems.map(item => 
          item._id === id ? response.data : item
        )
      );
    } catch (error) {
      console.error('Error updating featured status:', error);
      alert('Failed to update featured status. Please try again.');
    }
  };

  const toggleVisibility = async (id) => {
    try {
      const item = galleryItems.find(item => item._id === id);
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/gallery/${id}`,
        { isPublic: !item.isPublic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setGalleryItems(
        galleryItems.map(item => 
          item._id === id ? response.data : item
        )
      );
    } catch (error) {
      console.error('Error updating visibility:', error);
      alert('Failed to update visibility. Please try again.');
    }
  };

  const filteredGalleryItems = galleryItems
    .filter(item => 
      (currentFilter === 'all' || 
       (currentFilter === 'featured' && item.featured) ||
       (currentFilter === 'public' && item.isPublic) ||
       (currentFilter === 'private' && !item.isPublic) ||
       currentFilter === item.category) &&
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gallery Management</h1>
          <p className="text-gray-600 mt-1">Manage photo albums and media collections</p>
        </div>
        <div className="mt-4 md:mt-0">
        <Link 
            to="/admin/gallery/uploadLinks" 
            className="bg-yellow-700 hover:bg-yellow-500 text-white py-2 px-4 rounded-md mr-2"
          >
            Upload Photos Links
          </Link>
          <Link 
            to="/admin/gallery/upload" 
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md mr-2"
          >
            Upload Photos
          </Link>
          <Link 
            to="/admin/gallery/create-album" 
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
          >
            Create Album
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'all' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'featured' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('featured')}
            >
              Featured
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'public' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('public')}
            >
              Public
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'private' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('private')}
            >
              Private
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search gallery..."
              className="w-full px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                  currentView === 'grid' 
                    ? 'bg-gray-200 text-gray-700 border-gray-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentView('grid')}
              >
                Grid
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                  currentView === 'list' 
                    ? 'bg-gray-200 text-gray-700 border-gray-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentView('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Items */}
      {filteredGalleryItems.length > 0 ? (
        currentView === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGalleryItems.map(item => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <div className="flex space-x-1">
                      {item.featured && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          Featured
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.isPublic ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <p>{item.photos.length + item.imageAdresses.length} photos • Uploaded by {user.email.split("@")[0]}</p>
                    <p>Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                    <p>Upload date: {new Date(item.uploadDate).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Link 
                      to={`/admin/gallery/view/${item._id}`}
                      className="text-purple-600 hover:text-purple-900 text-sm font-medium"
                    >
                      View Album
                    </Link>
                    <div>
                      <button 
                        onClick={() => toggleVisibility(item._id)} 
                        className="text-gray-600 hover:text-gray-900 text-sm font-medium mr-3"
                      >
                        {item.isPublic ? 'Make Private' : 'Make Public'}
                      </button>
                      <button 
                        onClick={() => toggleFeatured(item._id)} 
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium mr-3"
                      >
                        {item.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button 
                        onClick={() => deleteGalleryItem(item._id)} 
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Album
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGalleryItems.map(item => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-md object-cover" src={item.thumbnailUrl} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{item.description}</div>
                      <div className="text-sm text-gray-500">{item.photos.length} photos</div>
                      <div className="text-sm text-gray-500">Uploaded: {new Date(item.updatedAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.isPublic ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.isPublic ? 'Public' : 'Private'}
                        </span>
                        {item.featured && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/admin/gallery/view/${item._id}`} className="text-purple-600 hover:text-purple-900 mr-3">
                        View
                      </Link>
                      <Link to={`/admin/gallery/edit/${item._id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </Link>
                      <button 
                        onClick={() => toggleVisibility(item._id)} 
                        className="text-gray-600 hover:text-gray-900 mr-3"
                      >
                        {item.isPublic ? 'Make Private' : 'Make Public'}
                      </button>
                      <button 
                        onClick={() => toggleFeatured(item._id)} 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        {item.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button 
                        onClick={() => deleteGalleryItem(item._id)} 
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
        )
      ) : (
        <div className="bg-white rounded-lg shadow-md py-8 text-center text-gray-500">
          <p>No gallery items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;