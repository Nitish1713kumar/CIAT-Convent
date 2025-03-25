import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import ImageLink from '../models/ImageLink.js'; 
import GalleryItem from '../models/GalleryItem.js'; 
const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
    const { galleryItemId, imageAddresses, uploadedBy, isPublic, featured } = req.body;

    console.log('galleryItemId:', galleryItemId);
    console.log('imageAddresses:', imageAddresses);
    if (!galleryItemId) {
        return res.status(400).json({ message: 'Gallery item ID is required' });
    }

    if (!Array.isArray(imageAddresses) || imageAddresses.length === 0) {
        return res.status(400).json({ message: 'Image addresses must be a non-empty array' });
    }

    try {
        // Find the gallery item
        const galleryItem = await GalleryItem.findById(galleryItemId);
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        // Create and save image links
        const imageLinks = await Promise.all(
            imageAddresses.map(async (imageAddress) => {
                const newImageLink = new ImageLink({
                    galleryItem: galleryItemId,
                    imageAddress: imageAddress, // Fixed typo from `imageAdress` to `imageAddress`
                    uploadedBy,
                    isPublic,
                    featured
                });
                await newImageLink.save();
                return newImageLink;
            })
        );

        // Update GalleryItem with the new image links
        if (!Array.isArray(galleryItem.imageAddresses)) {
            galleryItem.imageAddresses = [];
        }
        
        galleryItem.imageAdresses.push(...imageLinks.map(link => link._id));
        galleryItem.imageCount += imageLinks.length;
        await galleryItem.save();

        res.status(201).json({
            message: 'Image addresses saved successfully',
            images: imageLinks,
        });
    } catch (error) {
        console.error('Error saving image addresses:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the gallery item by ID
        const galleryItem = await GalleryItem.findById(id).populate('imageAdresses');
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        res.status(200).json({
            message: 'Image addresses retrieved successfully',
            images: galleryItem.imageAdresses,
        });
    } catch (error) {
        console.error('Error retrieving image addresses:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the image link by ID
        const imageLink = await ImageLink.findById(id);
        if (!imageLink) {
            return res.status(404).json({ message: 'Image link not found' });
        }

        // Delete the image link
        await imageLink.deleteOne();

        // Update the gallery item
        await GalleryItem.findByIdAndUpdate(imageLink.galleryItem, {
            $pull: { imageAdresses: id },
            $inc: { imageCount: -1 },
        });

        res.status(200).json({ message: 'Image link deleted successfully' });
    } catch (error) {
        console.error('Error deleting image link:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
