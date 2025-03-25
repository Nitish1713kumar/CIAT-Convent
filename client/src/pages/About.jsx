import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const About = () => {
  window.scrollTo(0, 0);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-#FFAB00 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <div className="w-20 h-1 bg-#FFAB00 mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto">
              Discover our journey, values, and commitment to educational excellence
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-soft"
            >
              <img
                src="https://res.cloudinary.com/dbh02ryca/image/upload/v1741523148/student7_zfcc1b.jpg"
                alt="School history"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Our <span className="text-primary-600">History</span>
              </h2>
              <div className="w-20 h-1 bg-primary-600 mb-6"></div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Founded in 1998, Education Institute began with a vision to transform education and create a learning environment where students could thrive academically and personally. What started as a small school with just 150 students has now grown into a prestigious institution with over 2500 students and 120 faculty members.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Throughout our journey of 25 years, we have continuously evolved our teaching methodologies, curriculum, and facilities to stay at the forefront of educational innovation. Our commitment to excellence has helped us achieve numerous accolades and produce thousands of successful alumni who are making significant contributions in various fields across the globe.
              </p>
              <Link
                to="/vision-mission"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-#FFAB00 rounded-md hover:bg-primary-700 transition-colors"
              >
                Our Vision & Mission
                <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Education Institute
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'Striving for the highest standards in all our academic and extracurricular pursuits',
                icon: '🏆',
              },
              {
                title: 'Integrity',
                description: 'Fostering honesty, ethics, and strong moral principles in our students and staff',
                icon: '⚖️',
              },
              {
                title: 'Innovation',
                description: 'Embracing new ideas, technologies, and methodologies to enhance learning experiences',
                icon: '💡',
              },
              {
                title: 'Inclusivity',
                description: 'Creating a diverse and welcoming environment where everyone feels valued and respected',
                icon: '🤝',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-#FFAB00 p-8 rounded-lg shadow-soft text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-#FFAB00">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Educational Community
          </h2>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto mb-8">
            Be a part of our journey towards educational excellence. Apply now for admission or reach out to learn more about our programs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/admissions"
              className="px-8 py-3 bg-#FFAB00 text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-#FFAB00 text-#FFAB00 font-medium rounded-md hover:bg-primary-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;