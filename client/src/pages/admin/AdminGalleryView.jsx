import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import ImageGallery from './ImageGallery';

const AdminGalleryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [album, setAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentView, setCurrentView] = useState('grid');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchAlbumDetails();
    }
  }, [isAuthenticated, id]);

  const fetchImageLink = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/uploadImageLinks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      let temp = response.data.images;
      temp.map((image) => {
        image.imageUrl = image.imageAddress;
      });
    
    } catch (error) {
      console.error('Error fetching image link:', error);
    }
  };

  useEffect(() => {
    fetchImageLink();
  }, [id]);

  const fetchAlbumDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch album details
      const albumResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlbum(albumResponse.data);

      // Fetch images for this album
      const imagesResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/photos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    
      setImages(imagesResponse.data);
    } catch (error) {
      console.error('Error fetching album details:', error);
      setError('Failed to load album details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/photos/${imageId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Remove the deleted image from state
        setImages(images.filter((image) => image._id !== imageId));

        // If it was the selected image, clear selection
        if (selectedImage && selectedImage._id === imageId) {
          setSelectedImage(null);
        }

        // Update the album's image count
        setAlbum({
          ...album,
          imageCount: album.imageCount - 1
        });
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Failed to delete image. Please try again.');
      }
    }
  };

  const handleSetAsThumbnail = async (imageId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/photos/${id}`,
        { thumbnailUrl: images.find((img) => img._id === imageId).imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlbum(response.data);
      alert('Thumbnail updated successfully');
    } catch (error) {
      console.error('Error updating thumbnail:', error);
      alert('Failed to update thumbnail. Please try again.');
    }
  };

  const handleDeleteAlbum = async () => {
    if (
      window.confirm(
        'Are you sure you want to delete this entire album and all its images? This action cannot be undone.'
      )
    ) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Redirect back to gallery list after deletion
        navigate('/admin/gallery');
      } catch (error) {
        console.error('Error deleting album:', error);
        alert('Failed to delete album. Please try again.');
      }
    }
  };

  const toggleAlbumVisibility = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/gallery/${id}`,
        { isPublic: !album.isPublic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlbum(response.data);
    } catch (error) {
      console.error('Error updating visibility:', error);
      alert('Failed to update visibility. Please try again.');
    }
  };

  const toggleFeatured = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/gallery/${id}`,
        { featured: !album.featured },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlbum(response.data);
    } catch (error) {
      console.error('Error updating featured status:', error);
      alert('Failed to update featured status. Please try again.');
    }
  };

  // Function to open the image viewer
  const openImageViewer = (image) => {
    setSelectedImage(image);
  };

  // Function to close the image viewer
  const closeImageViewer = () => {
    setSelectedImage(null);
  };

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

  if (!album) {
    return (
      <div
        className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Album not found! </strong>
        <span className="block sm:inline">The requested album could not be found.</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div className="flex items-center mb-2">
            <Link to="/admin/gallery" className="text-gray-600 hover:text-gray-900 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">{album.title}</h1>
          </div>
          <p className="text-gray-600">{album.description}</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Link
            to="/admin/gallery/uploadLinks"
            className="bg-yellow-700 hover:bg-ywllow-500 text-white py-2 px-4 rounded-md mr-2"
          >
            Upload Photos Links
          </Link>
          <Link
            to={`/admin/gallery/upload`}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
          >
            Add Photos
          </Link>
        </div>
      </div>

      {/* Album details card */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  album.isPublic ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {album.isPublic ? 'Public' : 'Private'}
              </span>
              {album.featured && (
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  Featured
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                {album.category.charAt(0).toUpperCase() + album.category.slice(1)}
              </span>
            </div>
            <p className="text-gray-700">
              <strong>Created:</strong> {new Date(album.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <strong>Updated:</strong> {new Date(album.updatedAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <strong>Images:</strong> {images.length}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={toggleAlbumVisibility}
              className={`px-3 py-1 rounded-md text-sm ${
                album.isPublic
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {album.isPublic ? 'Make Private' : 'Make Public'}
            </button>
            <button
              onClick={toggleFeatured}
              className={`px-3 py-1 rounded-md text-sm ${
                album.featured
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {album.featured ? 'Remove Featured' : 'Mark as Featured'}
            </button>
            <button
              onClick={handleDeleteAlbum}
              className="px-3 py-1 rounded-md text-sm bg-red-100 text-red-700 hover:bg-red-200"
            >
              Delete Album
            </button>
          </div>
        </div>
      </div>

      <ImageGallery id={id} token={token} />

      <p className="text-2xl font-bold p-4 mt-2">Image Cloudnairy Gallery</p>
      {/* View toggle */}
      <div className="flex justify-end mb-4">
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

      {/* Images section */}
      {images.length > 0 ? (
        currentView === 'grid' ? (
          <div className="grid p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image) => (
              <div key={image._id} className="bg-white rounded-lg shadow-md overflow-hidden group relative">
                <div className="relative pb-[75%]">
                  <img
                    src={image.imageUrl}
                    alt={image.caption || 'Gallery image'}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                    onClick={() => openImageViewer(image)}
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-500">{new Date(image.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-1 p-2">
                    <button
                      onClick={() => openImageViewer(image)}
                      className="bg-white p-2 rounded-full"
                      title="View Image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleSetAsThumbnail(image._id)}
                      className="bg-white p-2 rounded-full"
                      title="Set as Album Thumbnail"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image._id)}
                      className="bg-white p-2 rounded-full"
                      title="Delete Image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
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
                    Image
                  </th>
                  
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {images.map((image) => (
                  <tr key={image._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-20 w-20">
                        <img
                          className="h-20 w-20 rounded-md object-cover cursor-pointer"
                          src={image.imageUrl}
                          alt={image.caption || 'Gallery image'}
                          onClick={() => openImageViewer(image)}
                        />
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openImageViewer(image)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleSetAsThumbnail(image._id)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Set as Thumbnail
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image._id)}
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
          <p>No images found in this album.</p>
          <Link
            to={`/admin/gallery/upload`}
            className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
          >
            Upload Photos
          </Link>
        </div>
      )}

      {/* Image viewer modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-screen p-4">
            <button
              onClick={closeImageViewer}
              className="absolute top-2 right-2 bg-white rounded-full p-2 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.caption || 'Gallery image'}
              className="max-h-[80vh] max-w-full object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <p className="text-sm">Uploaded on {new Date(selectedImage.updatedAt).toLocaleDateString()}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleSetAsThumbnail(selectedImage._id)}
                  className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                >
                  Set as Album Thumbnail
                </button>
                <button
                  onClick={() => {
                    handleDeleteImage(selectedImage._id);
                    closeImageViewer();
                  }}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                >
                  Delete Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGalleryView;
