import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const AdminGalleryUpload = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    imageCount: 0,
    category: 'events', // Default category
    isPublic: true,
    featured: false,
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle number inputs
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0,
    });
  };

  // Handle file uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedImages(files);
    
    // If files are uploaded, set the imageCount automatically
    if (files.length > 0) {
      setFormData({
        ...formData,
        imageCount: files.length,
      });
    }

    // For demo purposes, we're setting a placeholder thumbnail
    // In a real app, you'd process the first image to create a thumbnail
    if (files.length > 0 && !formData.thumbnailUrl) {
      setFormData({
        ...formData,
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      });
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Get the JWT token from local storage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Prepare the payload with current timestamp for dates
      const now = new Date().toISOString();
      const payload = {
        ...formData,
        uploadDate: now,
        createdAt: now,
        updatedAt: now,
        uploadedBy: user.email.split("@")[0], // Use the email as the username
      };

      // Make API request to create gallery item
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/gallery`,
        payload,
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // If we have actual images to upload (in a real implementation)
      if (uploadedImages.length > 0) {
        // Here you would typically upload the actual images with another API call
        // This is a placeholder for that functionality
        const formData = new FormData();
        uploadedImages.forEach((file, index) => {
          formData.append('images', file);
        });

        // Mock an image upload with progress
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setUploadProgress(i);
        }

        // In a real implementation, you'd make another axios call to upload the images
        // await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/${response.data._id}/images`, 
        //   formData,
        //   { 
        //     headers: { 
        //       'Authorization': `Bearer ${token}`,
        //       'Content-Type': 'multipart/form-data'
        //     },
        //     onUploadProgress: (progressEvent) => {
        //       const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //       setUploadProgress(percentCompleted);
        //     }
        //   }
        // );
      }

      // Navigate back to gallery management page after successful creation
      navigate('/admin/gallery');
    } catch (error) {
      console.error('Error creating gallery item:', error);
      setError(error.response?.data?.message || 'Failed to create gallery item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Categories list
  const categories = [
    'events',
    'academic',
    'sports',
    'cultural'
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Upload New Gallery</h1>
        <p className="text-gray-600 mt-1">Create a new photo collection or album</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  value={formData.thumbnailUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://example.com/thumbnail.jpg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Leave empty to use the first uploaded image as thumbnail
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div>
            
            {/*
              <div className="mb-4">
                <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Images *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <input
                    type="file"
                    id="imageUpload"
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                    accept="image/*"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-8m-12 0h12"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="mt-2 block text-sm font-medium text-gray-700">
                      {uploadedImages.length > 0
                        ? `${uploadedImages.length} files selected`
                        : "Click to select images"}
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </span>
                  </label>
                </div>
                {uploadedImages.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {uploadedImages.length} images selected for upload
                    </p>
                  </div>
                )}
              </div>

             */}

              <div className="flex flex-col space-y-3 mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                    Make gallery public
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                    Feature this gallery
                  </label>
                </div>
              </div>
            </div>
          </div>

          {isSubmitting && uploadProgress > 0 && (
            <div className="w-full mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Uploading: {uploadProgress}%
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/admin/gallery')}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Gallery'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminGalleryUpload;