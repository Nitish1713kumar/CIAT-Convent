import { useState, useEffect } from "react";
import axios from "axios";

const ImageGallery = ({ id, token }) => {
  const [images, setImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetchImageLinks();
  }, [id]);

  const fetchImageLinks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/uploadImageLinks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let temp = response.data.images.map((image) => ({
        ...image,
        imageUrl: image.imageAddress,
      }));
      setImages(temp);
    } catch (error) {
      console.error("Error fetching image links:", error);
    }
  };

  const openImageViewer = (image) => setSelectedImage(image);
  const closeImageViewer = () => setSelectedImage(null);

  const handleSetAsThumbnail = async (imageId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/photos/${id}`,
        { thumbnailUrl: images.find((img) => img._id === imageId).imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlbum(response.data);
      alert("Thumbnail updated successfully");
    } catch (error) {
      console.error("Error updating thumbnail:", error);
      alert("Failed to update thumbnail. Please try again.");
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/uploadImageLinks/${imageId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setImages(images.filter((image) => image._id !== imageId));
        if (selectedImage && selectedImage._id === imageId) {
          setSelectedImage(null);
        }
        
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("Failed to delete image. Please try again.");
      }
    }
  };

  return (
    <div className="p-4">
      <p className="text-2xl font-bold mb-8">ImageLink Gallery</p>
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image) => (
            <div
              key={image._id}
              className="bg-white rounded-lg shadow-md overflow-hidden group relative"
            >
              <div className="relative pb-[75%]">
                <img
                  src={image.imageUrl}
                  alt={image.caption || "Gallery image"}
                  className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                  onClick={() => openImageViewer(image)}
                />
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleSetAsThumbnail(image._id)}
                      className="bg-white p-2 rounded-full"
                      title="Set as Album Thumbnail"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image._id)}
                      className="bg-white p-2 rounded-full"
                      title="Delete Image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md py-8 text-center text-gray-500">
          <p>No images links found in this album.</p>
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
          ✖
        </button>
        <img
          src={selectedImage.imageUrl}
          alt={selectedImage.caption || "Gallery image"}
          className="max-h-[80vh] max-w-full object-contain"
        />
        <div className="absolute bottom-4 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <p className="text-sm">
            Uploaded on {new Date(selectedImage.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )}
  
    </div>
  );
};

export default ImageGallery;
