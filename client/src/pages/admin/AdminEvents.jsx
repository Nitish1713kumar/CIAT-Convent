import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const AdminEvents = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('upcoming');

  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setEvents(response.data); // Set events from API response
      // Mock data for demonstration
      
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
  
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Remove the event from state after deletion
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  
  // const publishEvent = (id) => {
  //   setEvents(
  //     events.map(event => 
  //       event.id === id 
  //         ? { ...event, status: 'published' } 
  //         : event
  //     )
  //   );
  // };

  const publishEvent = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`,
        { status: 'published' }, // Update status to published
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Update state after successful API response
      setEvents(events.map(event => (event.id === id ? response.data : event)));
    } catch (error) {
      console.error('Error publishing event:', error);
    }
  };
  

  const isUpcoming = (date) => {
    return new Date(date) > new Date();
  };

  const filteredEvents = events
    .filter(event => 
      // Filter by status
      (currentFilter === 'all' || event.status === currentFilter) &&
      // Filter by date
      (dateFilter === 'all' || 
       (dateFilter === 'upcoming' && isUpcoming(event.date)) || 
       (dateFilter === 'past' && !isUpcoming(event.date))) &&
      // Search term
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       event.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Events Management</h1>
          <p className="text-gray-600 mt-1">Create, edit, and manage school events</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/admin/events/create" 
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
          >
            Create New Event
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'all' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('published')}
            >
              Published
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('draft')}
            >
              Drafts
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'scheduled' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('scheduled')}
            >
              Scheduled
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded-md text-sm ${dateFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setDateFilter('all')}
            >
              All Dates
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${dateFilter === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setDateFilter('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${dateFilter === 'past' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setDateFilter('past')}
            >
              Past
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendees
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.map(event => (
                  <tr key={event.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{event.description}</div>
                      <div className="text-xs text-gray-500 mt-1">Organizer: {event.organizer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                        {new Date(event.endDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{event.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${event.status === 'published' ? 'bg-green-100 text-green-800' : 
                          event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-purple-100 text-purple-800'}`}
                      >
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {event.attendees > 0 ? event.attendees : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {event.status === 'draft' && (
                        <button 
                          onClick={() => publishEvent(event._id)} 
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Publish
                        </button>
                      )}
                      <Link to={`/admin/events/edit/${event._id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </Link>
                      <button 
                        onClick={() => deleteEvent(event._id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;