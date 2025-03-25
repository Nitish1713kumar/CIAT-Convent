import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiArrowLeft,
  FiShare2,
  FiDownload,
  FiUsers,
  FiTag
} from 'react-icons/fi';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedEvents, setRelatedEvents] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // For development, using placeholder data
        // In production, use real API endpoints
        
        setTimeout(() => {
          // This is mock data - in production, fetch the specific event by ID
          const mockEvent = {
            _id: id,
            title: 'Annual Cultural Fest',
            description: 'A celebration of art, music, dance, and cultural performances by our talented students. This festival highlights the diverse cultural talents of our student body and provides a platform for creative expression.',
            longDescription: `
              <p>The Annual Cultural Fest is one of the most anticipated events of our academic calendar. Taking place over two days, it features a wide range of performances and activities that showcase the artistic talents of our students.</p>
              
              <p>The event will begin with an inaugural ceremony attended by distinguished guests from the arts community. This will be followed by a series of performances including classical and contemporary dance, vocal and instrumental music, dramatic presentations, and more.</p>
              
              <p>In addition to performances, the festival will include:</p>
              <ul>
                <li>Art exhibition featuring student artwork</li>
                <li>Cultural food stalls representing diverse cuisines</li>
                <li>Traditional crafts demonstrations</li>
                <li>Interactive workshops on various art forms</li>
              </ul>
              
              <p>Parents and community members are warmly invited to attend and support our talented students. Tickets are available at the school reception or can be purchased online through our school portal.</p>
            `,
            date: '2023-12-05',
            time: '5:00 PM - 9:00 PM',
            location: 'School Amphitheater',
            address: '123 Education Lane, Knowledge City, 54321',
            organizer: 'Cultural Committee',
            category: 'cultural',
            image: 'https://source.unsplash.com/random/1200x600/?festival,performance',
            gallery: [
              'https://source.unsplash.com/random/800x600/?dance',
              'https://source.unsplash.com/random/800x600/?music',
              'https://source.unsplash.com/random/800x600/?art',
              'https://source.unsplash.com/random/800x600/?culture'
            ],
            registrationRequired: true,
            registrationLink: '#',
            contactPerson: 'Ms. Sarah Johnson',
            contactEmail: 'cultural@example.edu',
            contactPhone: '(555) 123-4567'
          };
          
          setEvent(mockEvent);
          
          // Mock related events
          setRelatedEvents([
            {
              _id: '8',
              title: 'Annual Art Exhibition',
              description: 'Showcasing the artistic talents of our students across various media.',
              date: '2024-02-05',
              time: '9:00 AM - 5:00 PM',
              location: 'Art Gallery',
              category: 'cultural',
              image: 'https://source.unsplash.com/random/800x500/?art,exhibition'
            },
            {
              _id: '3',
              title: 'Annual Cultural Fest',
              description: 'A celebration of art, music, dance, and cultural performances by our talented students.',
              date: '2023-12-05',
              time: '5:00 PM - 9:00 PM',
              location: 'School Amphitheater',
              category: 'cultural',
              image: 'https://source.unsplash.com/random/800x500/?festival,performance'
            },
            {
              _id: '7',
              title: 'Inter-School Debate Competition',
              description: 'Students from various schools compete in a battle of words and ideas.',
              date: '2024-01-20',
              time: '10:00 AM - 4:00 PM',
              location: 'Main Auditorium',
              category: 'academic',
              image: 'https://source.unsplash.com/random/800x500/?debate,competition'
            }
          ]);
          
          setLoading(false);
        }, 800);

        // In production, use the following:
        /*
        const eventResponse = await axios.get(`/api/events/${id}`);
        setEvent(eventResponse.data);
        
        const relatedResponse = await axios.get(`/api/events/related/${id}`);
        setRelatedEvents(relatedResponse.data);
        
        setLoading(false);
        */
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
      }
    };

    fetchEventDetails();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Add to calendar function
  const addToCalendar = () => {
    alert('Calendar event creation functionality would be implemented here');
  };

  // Share function
  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      })
     
    } else {
      alert('Web Share API not supported in your browser');
    }
  };

  if (loading) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-20 pb-16 min-h-screen">
        <div className="container mx-auto px-4 text-center py-20">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/events"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-#FFAB00 rounded-md hover:bg-primary-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      {/* Event Hero */}
      <section className="relative">
        <div className="h-64 md:h-96 w-full bg-gray-300">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="relative -mt-20 md:-mt-32 mb-8 bg-#FFAB00 rounded-lg shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 bg-primary-600 text-#FFAB00 text-sm font-medium rounded-full mb-4">
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-y-4">
              <div className="w-full md:w-1/2 lg:w-1/3 flex items-center text-gray-600">
                <FiCalendar className="mr-2 text-primary-600" size={18} />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 flex items-center text-gray-600">
                <FiClock className="mr-2 text-primary-600" size={18} />
                <span>{event.time}</span>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 flex items-center text-gray-600">
                <FiMapPin className="mr-2 text-primary-600" size={18} />
                <span>{event.location}</span>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 flex items-center text-gray-600">
                <FiUsers className="mr-2 text-primary-600" size={18} />
                <span>Organizer: {event.organizer}</span>
              </div>
              <div className="w-full md:w-1/2 lg:w-2/3 flex items-center text-gray-600">
                <FiMapPin className="mr-2 text-primary-600" size={18} />
                <span>Address: {event.address}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={addToCalendar}
                className="flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 transition-colors"
              >
                <FiCalendar className="mr-2" /> Add to Calendar
              </button>
              <button
                onClick={shareEvent}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <FiShare2 className="mr-2" /> Share
              </button>
              {event.registrationRequired && (
                <a
                  href={event.registrationLink}
                  className="flex items-center px-4 py-2 bg-primary-600 text-#FFAB00 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Register Now
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-#FFAB00 rounded-lg shadow-soft p-6 mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">About This Event</h2>
                <div 
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: event.longDescription }}
                />
              </div>

              {event.gallery && event.gallery.length > 0 && (
                <div className="bg-#FFAB00 rounded-lg shadow-soft p-6 mb-8">
                  <h2 className="text-2xl font-bold text-secondary-900 mb-4">Event Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {event.gallery.map((image, index) => (
                      <div key={index} className="h-32 md:h-40 overflow-hidden rounded-lg">
                        <img
                          src={image}
                          alt={`Event gallery ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-#FFAB00 rounded-lg shadow-soft p-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Location</h2>
                <div className="bg-gray-200 rounded-lg h-64 mb-4">
                  {/* In production, replace with actual Google Maps or other map component */}
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Map would be displayed here
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <p className="font-medium text-secondary-900">{event.location}</p>
                    <p className="text-gray-600">{event.address}</p>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-#FFAB00 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-#FFAB00 rounded-lg shadow-soft p-6 mb-8 sticky top-24">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">Contact Information</h3>
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="text-gray-700 mb-1"><span className="font-medium">Contact Person:</span> {event.contactPerson}</p>
                  <p className="text-gray-700 mb-1"><span className="font-medium">Email:</span> {event.contactEmail}</p>
                  <p className="text-gray-700"><span className="font-medium">Phone:</span> {event.contactPhone}</p>
                </div>

                {event.registrationRequired && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-secondary-900 mb-2">Registration Required</h4>
                    <p className="text-gray-600 mb-4">Please register in advance to secure your spot for this event.</p>
                    <a
                      href={event.registrationLink}
                      className="block w-full text-center px-4 py-2 bg-primary-600 text-#FFAB00 rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Register Now
                    </a>
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-semibold text-secondary-900 mb-2">Share This Event</h4>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-600 text-#FFAB00 rounded-full hover:bg-blue-700 transition-colors">
                      {/* Replace with actual social media icons */}
                      F
                    </button>
                    <button className="p-2 bg-sky-500 text-#FFAB00 rounded-full hover:bg-sky-600 transition-colors">
                      T
                    </button>
                    <button className="p-2 bg-amber-200 text-amber-800 rounded-full hover:bg-amber-300 transition-colors">
                        I
                    </button>
                   </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        </section>
        
        {/* Related Events */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Related Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedEvents.map((related) => (
                <motion.div
                  key={related._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-#FFAB00 rounded-lg shadow-lg overflow-hidden"
                >
                  <Link to={`/events/${related._id}`}>
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/events/${related._id}`}>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">{related.title}</h3>
                    </Link>
                    <p className="text-gray-600">{related.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <Link
                        to={`/events/${related._id}`}
                        className="text-primary-600 hover:underline"
                      >
                        Learn More
                      </Link>
                      <span className="text-sm text-gray-500">
                        {formatDate(related.date)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        </div>
        );
        };
export default EventDetail;