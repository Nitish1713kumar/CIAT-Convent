import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: String, required: true },
  status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
  attendees: { type: Number, default: 0 }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
