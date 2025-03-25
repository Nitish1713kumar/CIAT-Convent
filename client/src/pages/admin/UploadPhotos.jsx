import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const UploadPhotos = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState('');
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchGalleryItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Create preview URLs for selected files
    if (files.length > 0) {
      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
      
      // Clean up preview URLs when component unmounts
      return () => {
        newPreviews.forEach(preview => URL.revokeObjectURL(preview));
      };
    }
  }, [files]);

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
      setError('Failed to load albums. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleAlbumSelect = (e) => {
    setSelectedAlbumId(e.target.value);
  };

  const removeFile = (index) => {
    const updatedFiles = Array.from(files).filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach(file => {
      dataTransfer.items.add(file);
    });
    
    setFiles(dataTransfer.files);
    setPreviews(updatedPreviews);
  };

  const uploadImages = async (galleryItemId, images, token) => {
    const formData = new FormData();
    formData.append("galleryItemId", galleryItemId);
    Array.from(images).forEach((image) => formData.append("photos", image));
    
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/photos/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      }
    );
    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedAlbumId) {
      setError('Please select an album');
      return;
    }
    
    if (files.length === 0) {
      setError('Please select at least one photo to upload');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      await uploadImages(selectedAlbumId, files, token);
      navigate(`/admin/gallery/view/${selectedAlbumId}`);
    } catch (error) {
      console.error('Error uploading photos:', error);
      setError('Failed to upload photos. Please try again later.');
      setIsUploading(false);
    }
  };

  const filteredGalleryItems = galleryItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Upload Photos</h1>
          <p className="text-gray-600 mt-1">Add new photos to an existing album</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/admin/gallery" 
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
          >
            Back to Gallery
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Select Album
            </label>
            {galleryItems.length === 0 ? (
              <div className="text-red-500 mb-4">
                No albums found. Please create an album first.
                <Link to="/admin/gallery/create-album" className="ml-2 text-purple-600 hover:text-purple-800 underline">
                  Create Album
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search albums..."
                    className="w-full px-4 py-2 border rounded-md mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto p-2">
                  {filteredGalleryItems.length > 0 ? (
                    filteredGalleryItems.map(item => (
                      <div 
                        key={item._id} 
                        className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                          selectedAlbumId === item._id ? 'ring-2 ring-purple-500' : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedAlbumId(item._id)}
                      >
                        <img 
                          src={item.thumbnailUrl} 
                          alt={item.title} 
                          className="w-full h-32 object-cover" 
                        />
                        <div className="p-3">
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-500 truncate">{item.description}</p>
                          <div className="flex mt-2">
                            <input
                              type="radio"
                              id={`album-${item._id}`}
                              name="albumSelection"
                              value={item._id}
                              checked={selectedAlbumId === item._id}
                              onChange={handleAlbumSelect}
                              className="mr-2"
                            />
                            <label htmlFor={`album-${item._id}`} className="text-sm text-gray-700">
                              Select this album
                            </label>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 text-center text-gray-500 py-4">
                      No albums found matching your search.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Photos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="photoUpload"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={!selectedAlbumId || isUploading}
              />
              <label 
                htmlFor="photoUpload"
                className={`inline-block py-2 px-4 rounded-md cursor-pointer transition-colors ${
                  selectedAlbumId ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Select Photos
              </label>
              <p className="text-sm text-gray-500 mt-2">
                {selectedAlbumId 
                  ? "Click to browse or drag and drop your photos here" 
                  : "Please select an album first"
                }
              </p>
            </div>

            {previews.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Selected Photos ({previews.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-96 overflow-y-auto p-2">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        className="w-full h-24 object-cover rounded-md" 
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={isUploading}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {isUploading && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Uploading...</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{uploadProgress}% complete</p>
            </div>
          )}

          <div className="flex justify-end">
            <Link
              to="/admin/gallery"
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md mr-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className={`py-2 px-4 rounded-md ${
                selectedAlbumId && files.length > 0 && !isUploading
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!selectedAlbumId || files.length === 0 || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Photos'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPhotos;