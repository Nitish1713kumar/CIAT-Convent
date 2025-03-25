import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import connectDB from './db.js';
import galleryRoutes from './routes/galleryRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import news from './routes/news.js';
import events from './routes/events.js';
import imageLinkRoutes from './routes/imageLinkRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    preflightContinue: false,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/news', news);
app.use('/api/events', events);
app.use('/api/uploadImageLinks', imageLinkRoutes);
// app.use('/api/events', require('./routes/eventRoutes.js'));
// app.use('/api/news', require('./routes/newsRoutes.js'));
// app.use('/api/admissions', require('./routes/admissionRoutes.js'));
// app.use('/api/contact', require('./routes/contactRoutes.js'));

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => res.send('Hello!'));

export { app };