import mongoose from "mongoose";

const ImageLinkSchema = new mongoose.Schema(
  {
    galleryItem: { type: mongoose.Schema.Types.ObjectId, ref: "GalleryItem", required: true },
    imageAddress: { type: String },
    uploadedBy: { type : String }, // User reference
    isPublic: { type: Boolean, default: false },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const ImageLink = mongoose.model("ImageLink", ImageLinkSchema);
export default ImageLink;

