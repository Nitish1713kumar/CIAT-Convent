import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiImage, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import axios from 'axios';

const Gallery = () => {

  window.scrollTo(0, 0);

  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState({});

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'academic', name: 'Academic' },
    { id: 'sports', name: 'Sports' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'events', name: 'Events' },
  ];

  // Define your static array
const staticGalleryData = [
 
];

  // Fetch all gallery items
  useEffect(() => {
    const fetchGalleryItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/gallery`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
         // Filter out objects where isPublic is false
        const filteredData = response.data.filter(item => item.isPublic !== false);

        setGalleries(filteredData);
        setFilteredGalleries(filteredData);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        setError('Failed to load gallery items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Filter galleries based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredGalleries(galleries);
    } else {
      setFilteredGalleries(galleries.filter(gallery => gallery.category === selectedCategory));
    }
  }, [selectedCategory, galleries]);

  
  const fetchGalleryImages = async (galleryId) => {
    if (galleryImages[galleryId]) {
      return galleryImages[galleryId]; // Return cached images if already fetched
    }
  
    try {
      const token = localStorage.getItem('token');
  
      // Fetch images from `/api/photos/${galleryId}`
      const response1 = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/photos/${galleryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Fetch images from `/api/uploadImageLinks/${galleryId}`
      const response2 = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/uploadImageLinks/${galleryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Extract & format images from second response
      const formattedImages = response2.data.images.map((image) => ({
        ...image,
        imageUrl: image.imageAddress, // Correctly set image URL
      }));
  
      console.log(formattedImages, 'formattedImages');
  
      // Merge both API responses if needed (optional)
      const combinedImages = [...response1.data, ...formattedImages];
  
      // Cache the images for this gallery
      setGalleryImages(prev => ({
        ...prev,
        [galleryId]: combinedImages
      }));
  
      return combinedImages;
    } catch (error) {
      console.error(`Error fetching images for gallery ${galleryId}:`, error);
      return [];
    }
  };
  
  const openLightbox = async (gallery, index = 0) => {
    setSelectedGallery(gallery);
    setCurrentImageIndex(index);
    
    // Fetch images if not already cached
    if (!galleryImages[gallery._id]) {
      const images = await fetchGalleryImages(gallery._id);
      if (images.length === 0) {
        // If no images were found, don't open the lightbox
        return;
      }
    }
    
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    const images = galleryImages[selectedGallery._id];
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    const images = galleryImages[selectedGallery._id];
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="pt-1">
      {/* Hero Section */}
      <section className="bg-primary-600 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Photo Gallery
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-yellow-500 mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-primary-100 text-lg max-w-2xl mx-auto"
          >
            Explore memorable moments and events captured at our institution
          </motion.p>
        </div>
      </section>

      {/* Gallery Control Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center">
              <FiFilter className="text-gray-500 mr-2" />
              <h3 className="text-secondary-900 font-medium mr-4">Filter by:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <h3 className="text-secondary-900 font-medium mr-4">View:</h3>
              <div className="flex bg-white rounded-lg  border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FiGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FiList size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Items */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <FiImage size={60} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-500 mb-2">Error Loading Galleries</h2>
              <p className="text-gray-500">{error}</p>
            </div>
          ) : filteredGalleries.length === 0 ? (
            <div className="text-center py-12">
              <FiImage size={60} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-500 mb-2">No galleries found</h2>
              <p className="text-gray-500">
                No galleries match the selected category. Please try another filter.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGalleries.map((gallery) => (
                <div
                  key={gallery._id}
                 
                 
              
                  
                  className="bg-white rounded-lg shadow-soft hover:shadow-md transition-shadow"
                  onClick={() => openLightbox(gallery)}
                >
                  <div className="h-56  cursor-pointer">
                    <img
                      src={gallery.thumbnailUrl}
                      alt={gallery.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                        {categories.find(cat => cat.id === gallery.category)?.name || gallery.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(gallery.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                      {gallery.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {gallery.description}
                    </p>
                    <div className="flex -mx-1 mt-4">
                      {galleryImages[gallery._id]?.slice(0, 4).map((image, index) => (
                        <div 
                          key={index} 
                          className="px-1 w-1/4 cursor-pointer"
                          onClick={(e) => {
                           
                            openLightbox(gallery, index);
                          }}
                        >
                          <div className="h-16 bg-gray-100 rounded">
                            <img 
                              src={image.imageUrl || image} 
                              alt={`${gallery.title} - ${index + 1}`} 
                              className="w-full h-full object-cover hover:scale-110 transition-transform"
                            />
                          </div>
                        </div>
                      ))}
                      {!galleryImages[gallery._id] && (
                        <div className="flex justify-center items-center w-full h-16">
                          <div className="">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="px-1 w-1/4">
                                <div className="h-16 bg-gray-200 rounded"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredGalleries.map((gallery) => (
                <div
                  key={gallery._id}
                 
                  className="bg-white rounded-lg  shadow-soft hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    <div 
                      className="md:w-1/3 h-56 md:h-auto cursor-pointer"
                      onClick={() => openLightbox(gallery)}
                    >
                      <img
                        src={gallery.thumbnailUrl}
                        alt={gallery.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                          {categories.find(cat => cat.id === gallery.category)?.name || gallery.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(gallery.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        {gallery.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {gallery.description}
                      </p>
                      <div className="flex -mx-1 mt-4">
                        {galleryImages[gallery._id]?.slice(0, 4).map((image, index) => (
                          <div 
                            key={index} 
                            className="px-1 w-16 cursor-pointer"
                            onClick={() => {
                             
                              openLightbox(gallery, index);
                            }}
                          >
                            <div className="h-16 bg-gray-100 rounded">
                              <img 
                                src={image.imageUrl || image} 
                                alt={`${gallery.title} - ${index + 1}`} 
                                className="w-full h-full object-cover hover:scale-110 transition-transform"
                              />
                            </div>
                          </div>
                        ))}
                        {!galleryImages[gallery._id] && (
                          <div className="flex w-full space-x-1">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="px-1 w-16">
                                <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && selectedGallery && galleryImages[selectedGallery._id] && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={closeLightbox}
              className="text-white p-2 hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 left-4 z-10">
            <button 
              onClick={prevImage}
              className="text-white p-2 hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 right-4 z-10">
            <button 
              onClick={nextImage}
              className="text-white p-2 hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          <div className="max-w-4xl max-h-screen p-4">
            <img 
              src={galleryImages[selectedGallery._id][currentImageIndex]?.imageUrl || galleryImages[selectedGallery._id][currentImageIndex]} 
              alt={`${selectedGallery.title} - ${currentImageIndex + 1}`} 
              className="max-w-full max-h-[80vh] mx-auto"
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-medium">{selectedGallery.title}</h3>
              <p className="text-gray-300 mt-2">{currentImageIndex + 1} of {galleryImages[selectedGallery._id].length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;