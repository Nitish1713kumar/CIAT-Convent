import express from "express";
import GalleryItem from "../models/GalleryItem.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new gallery item
router.post("/", async (req, res) => {
  try {
    const { title, description, thumbnailUrl, imageCount, uploadedBy, category, isPublic, featured } = req.body;

    if (!title || !thumbnailUrl || !category) {
      return res.status(400).json({ message: "Title, thumbnail, and category are required" });
    }

    const newGalleryItem = new GalleryItem({
      title,
      description,
      thumbnailUrl,
      imageCount,
      category,
      uploadedBy,
      isPublic,
      featured
    });

    await newGalleryItem.save();
    res.status(201).json(newGalleryItem);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all gallery items
router.get("/", async (req, res) => {
  try {
    const galleryItems = await GalleryItem.find().sort({ uploadDate: -1 });
    res.json(galleryItems);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get a specific gallery item by ID
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

    // Validate that at least one field is provided for update
    if (!title && !description && !thumbnailUrl && !imageCount && !category && isPublic === undefined && featured === undefined) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const updatedGalleryItem = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Only update fields provided in req.body
      { new: true, runValidators: true } // Return updated document & validate fields
    );

    if (!updatedGalleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.json(updatedGalleryItem);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// Delete a gallery item
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
