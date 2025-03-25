import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary.js";
import GalleryItem from "../models/GalleryItem.js";
import Photo from "../models/Photo.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure Multer & Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gallery",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// Upload Multiple Photos to Cloudinary
router.post("/upload", authMiddleware, upload.array("photos", 10), async (req, res) => {
  try {
    const { galleryItemId } = req.body;

    if (!galleryItemId) {
      return res.status(400).json({ message: "Gallery item ID is required" });
    }

    const galleryItem = await GalleryItem.findById(galleryItemId);
    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const uploadedPhotos = await Promise.all(
      req.files.map(async (file) => {
        const newPhoto = new Photo({
          galleryItem: galleryItemId,
          imageUrl: file.path,
          publicId: file.filename,
          uploadedBy: req.user.id,
        });
        await newPhoto.save();
        return newPhoto;
      })
    );

    galleryItem.photos.push(...uploadedPhotos.map((photo) => photo._id));
    galleryItem.imageCount += uploadedPhotos.length;
    await galleryItem.save();

    res.status(201).json({ message: "Photos uploaded successfully", photos: uploadedPhotos });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// Get all photos of an album
router.get("/:galleryItemId", async (req, res) => {
  try {
    const { galleryItemId } = req.params;
    const photos = await Photo.find({ galleryItem: galleryItemId });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a photo
router.delete("/:photoId", authMiddleware, async (req, res) => {
  try {
    const { photoId } = req.params;
    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    await cloudinary.uploader.destroy(photo.publicId);
    await photo.deleteOne();
    await GalleryItem.findByIdAndUpdate(photo.galleryItem, {
      $pull: { photos: photoId },
      $inc: { imageCount: -1 },
    });

    res.json({ message: "Photo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Gallery Item Routes
router.post("/", async (req, res) => {
  try {
    const { title, description, thumbnailUrl, imageCount, category, isPublic, featured } = req.body;
    if (!title || !thumbnailUrl || !category) {
      return res.status(400).json({ message: "Title, thumbnail, and category are required" });
    }

    const newGalleryItem = new GalleryItem({ title, description, thumbnailUrl, imageCount, category, isPublic, featured });
    await newGalleryItem.save();
    res.status(201).json(newGalleryItem);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const galleryItems = await GalleryItem.find().sort({ uploadDate: -1 });
    res.json(galleryItems);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    res.json(galleryItem);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, thumbnailUrl, imageCount, category, isPublic, featured } = req.body;
    if (!title && !description && !thumbnailUrl && !imageCount && !category && isPublic === undefined && featured === undefined) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const updatedGalleryItem = await GalleryItem.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
    if (!updatedGalleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    res.json(updatedGalleryItem);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedGalleryItem = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!deletedGalleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    res.json({ message: "Gallery item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
