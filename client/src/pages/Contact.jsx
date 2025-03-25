import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const Contact = () => {

  window.scrollTo(0, 0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitMessage({
        type: 'success',
        text: 'Your message has been sent successfully. We will contact you shortly.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'There was a problem sending your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-#FFAB00 py-20 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <div className="w-20 h-1 bg-#FFAB00 mx-auto mt-4"></div>
        <p className="text-lg mt-4">We'd love to hear from you. Get in touch with us!</p>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-#FFAB00 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-primary-700 mb-6">Get in Touch</h2>
            <p className="text-gray-600">Feel free to reach out via email or phone, or visit our office during working hours.</p>
            <div className="mt-6 space-y-4">
              <p><span className="font-semibold">Address:</span> Kanjhwala, North West Delhi, 110081</p>
              <p><span className="font-semibold">Phone:</span> +91 85957 92883</p>
              <p><span className="font-semibold">Email:</span> Ciatschool1998@gmail.com</p>
              <p><span className="font-semibold">Office Hours:</span> Mon - Fri, 8:00 AM - 4:30 PM</p>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-#FFAB00 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-primary-700 mb-6">Send Us a Message</h2>
            {submitMessage.text && (
              <div className={`p-3 rounded mb-4 ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {submitMessage.text}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Your Name *" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" required />
              <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" required />
              <input type="text" name="subject" placeholder="Subject *" value={formData.subject} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" required />
              <textarea name="message" placeholder="Your Message *" value={formData.message} onChange={handleChange} rows="5" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" required></textarea>
              <button type="submit" disabled={isSubmitting} className="w-full bg-primary-600 bg-yellow-700 text-#FFAB00 py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-primary-700 transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <FiSend />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;