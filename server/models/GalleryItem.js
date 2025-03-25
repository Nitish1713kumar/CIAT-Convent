import mongoose from 'mongoose';

const GalleryItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['events', 'academic', 'sports', 'cultural'], 
    required: true
  },
  uploadedBy: {
    type: String,
    // required: true
  }, 
  uploadDate: {
    type: Date,
    default: Date.now
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }], // Reference Photos saved in cloudinary
  imageAdresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "ImageLink" }], // Image addresses saved in db
}, { timestamps: true });

const GalleryItem = mongoose.model('GalleryItem', GalleryItemSchema);
export default GalleryItem;
