import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const VisionMission = () => {
  window.scrollTo(0, 0);
  return (
    <div className="pt-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-#FFAB00 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Vision & Mission</h1>
            <div className="w-20 h-1 bg-#FFAB00 mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto">
              Our guiding principles and aspirations for educational excellence
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Our <span className="text-primary-600">Vision</span>
              </h2>
              <div className="w-20 h-1 bg-primary-600 mb-6"></div>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                To be a globally recognized center of educational excellence, nurturing future leaders who are innovative, compassionate, and equipped to address the challenges of an ever-changing world.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                We envision a learning environment where curiosity is encouraged, critical thinking is developed, and each student discovers their unique potential. Our graduates will be lifelong learners who contribute positively to society and lead with integrity.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-soft"
            >
              <img
                src="https://res.cloudinary.com/dbh02ryca/image/upload/v1741523147/student10_vcyull.jpg"
                alt="Our Vision"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-soft order-2 lg:order-1"
            >
              <img
                src="https://res.cloudinary.com/dbh02ryca/image/upload/v1741523149/student2_pbgogd.jpg"
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Our <span className="text-primary-600">Mission</span>
              </h2>
              <div className="w-20 h-1 bg-primary-600 mb-6"></div>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                To provide a holistic education that balances academic excellence with character development, fostering in our students the skills, knowledge, and values necessary for success in a globalized world.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                We accomplish this by:
              </p>
              <ul className="text-gray-700 mb-8 space-y-3">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Offering a comprehensive, innovative curriculum that challenges and inspires</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Employing dedicated educators who are experts in their fields</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Creating a safe, inclusive environment that celebrates diversity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Promoting critical thinking, creativity, and problem-solving skills</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Fostering strong ethical values and social responsibility</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Our Core Objectives
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Strategic goals that guide our educational approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Academic Excellence',
                description: 'To provide high-quality education that meets international standards and prepares students for higher education and professional success.',
                icon: '📚',
              },
              {
                title: 'Character Formation',
                description: 'To nurture values of integrity, respect, responsibility, and empathy, helping students develop strong moral compasses.',
                icon: '🌱',
              },
              {
                title: 'Global Citizenship',
                description: 'To foster an understanding of global issues and cultures, developing students who are responsible global citizens.',
                icon: '🌍',
              },
              {
                title: 'Innovation & Creativity',
                description: 'To encourage innovative thinking and creative problem-solving skills necessary for the 21st century.',
                icon: '💡',
              },
              {
                title: 'Holistic Development',
                description: 'To provide opportunities for physical, emotional, social, and intellectual growth through a balanced curriculum.',
                icon: '⚖️',
              },
              {
                title: 'Community Engagement',
                description: 'To foster meaningful connections with the wider community through service learning and collaborative projects.',
                icon: '🤝',
              },
            ].map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-#FFAB00 p-8 rounded-lg shadow-soft text-center"
              >
                <div className="text-4xl mb-4">{objective.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{objective.title}</h3>
                <p className="text-gray-600">{objective.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-#FFAB00">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Be Part of Our Journey?
          </h2>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto mb-8">
            Join us in our mission to create a brighter future through quality education. Apply now or contact us to learn more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/admissions"
              className="px-8 py-3 bg-#FFAB00 text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              to="/principal-message"
              className="px-8 py-3 border border-#FFAB00 text-#FFAB00 font-medium rounded-md hover:bg-primary-700 transition-colors"
            >
              Principal's Message
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionMission;