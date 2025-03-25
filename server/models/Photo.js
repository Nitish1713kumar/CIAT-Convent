import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    galleryItem: { type: mongoose.Schema.Types.ObjectId, ref: "GalleryItem", required: true },
    imageUrl: { type: String, required: true }, // Cloudinary URL
    publicId: { type: String, required: true }, // Cloudinary ID for deletion
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User reference
    isPublic: { type: Boolean, default: false },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Photo = mongoose.model("Photo", PhotoSchema);
export default Photo;
