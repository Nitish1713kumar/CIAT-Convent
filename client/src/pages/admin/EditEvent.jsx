import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    endDate: '',
    location: '',
    organizer: '',
    status: 'scheduled',
    attendees: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`, eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/admin/events'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating event:', error);
      setError('Failed to update event');
    }
  };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          name="endDate"
          value={eventData.endDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="organizer"
          value={eventData.organizer}
          onChange={handleChange}
          placeholder="Organizer"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <select
          name="status"
          value={eventData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <input
          type="number"
          name="attendees"
          value={eventData.attendees}
          onChange={handleChange}
          placeholder="Number of Attendees"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
