import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMail } from 'react-icons/fi';

const PrincipalMessage = () => {
  window.scrollTo(0, 0);
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-#FFAB00 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Principal's Message</h1>
            <div className="w-20 h-1 bg-#FFAB00 mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto">
              A welcome note from our principal, Anita kumari
            </p>
          </div>
        </div>
      </section>

      {/* Principal Message Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Principal Image and Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-#FFAB00 rounded-lg overflow-hidden shadow-soft">
                <div className="p-6">
                  
                  <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
                  Anita kumari
                  </h3>
                  <p className="text-primary-600 font-medium mb-4">Principal</p>
                  <p className="text-gray-600 mb-6">
                    Ph.D. in Educational Leadership<br />
                    M.Ed. in Curriculum Development<br />
                    B.Sc. in Mathematics
                  </p>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FiMail className="mr-2" />
                    <a href="phoneto:080102 82082" className="hover:text-primary-600 transition-colors">
                    080102 82082
                    </a>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <p className="text-gray-600 italic">
                      "Education is not just about academics; it's about preparing students for life's challenges and opportunities."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Message Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                A Message From Our <span className="text-primary-600">Principal</span>
              </h2>
              <div className="w-20 h-1 bg-primary-600 mb-6"></div>

              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Dear Parents, Students, and Visitors,
                </p>
                <p>
                  It is with great pleasure that I welcome you to the Education Institute website. As the Principal, I am proud to lead an institution that has been at the forefront of educational excellence for over 25 years.
                </p>
                <p>
                  At Education Institute, we believe that education is the most powerful tool for transformation—not just of individuals, but of societies. Our mission goes beyond academic excellence; we aim to nurture well-rounded individuals who will contribute meaningfully to society and lead with integrity in their chosen fields.
                </p>
                <p>
                  The world is changing at an unprecedented pace, presenting both challenges and opportunities for today's young minds. Our approach to education embraces this reality by combining traditional educational values with innovative teaching methodologies. We focus on developing critical thinking, creativity, adaptability, and social responsibility—skills that are essential for success in the 21st century.
                </p>
                <p>
                  Our dedicated faculty members are not just teachers but mentors who guide, inspire, and challenge our students to reach their full potential. They create a supportive learning environment where questions are encouraged, mistakes are viewed as learning opportunities, and achievements are celebrated.
                </p>
                <p>
                  Education Institute is more than just a school; it's a community where diverse cultures, ideas, and perspectives come together. We take pride in our inclusive environment where every student feels valued and respected.
                </p>
                <p>
                  As you explore our website, I hope you will get a glimpse of the vibrant academic and extracurricular life at Education Institute. Whether you are a prospective parent, a current student, or simply interested in our institution, I invite you to visit our campus and experience firsthand the energy, enthusiasm, and excellence that define us.
                </p>
                <p>
                  Thank you for your interest in Education Institute. We look forward to partnering with you on this educational journey.
                </p>
                <p className="font-semibold mt-8">
                  Warm regards,
                </p>
                <p className="italic">
                  Anita kumari<br />
                  Principal, CIAT CONVENT SCHOOL
                </p>
              </div>

              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-#FFAB00 rounded-md hover:bg-primary-700 transition-colors mr-4"
                >
                  About Our School
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors mt-4 sm:mt-0"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/*
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Our Leadership Team
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet other members of our administrative team dedicated to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Prof. Michael Chen',
                position: 'Vice Principal (Academics)',
                bio: 'Prof. Chen oversees curriculum development and implementation, ensuring that our academic programs meet the highest standards.',
                image: 'https://source.unsplash.com/random/300x400/?man,professor',
              },
              {
                name: 'Dr. Emily Rodriguez',
                position: 'Vice Principal (Administration)',
                bio: 'Dr. Rodriguez manages administrative functions and operations, focusing on providing an optimal learning environment.',
                image: 'https://source.unsplash.com/random/300x400/?woman,administrator',
              },
              {
                name: 'Dr. Robert Williams',
                position: 'Dean of Student Affairs',
                bio: 'Dr. Williams coordinates student support services and extracurricular activities, promoting holistic student development.',
                image: 'https://source.unsplash.com/random/300x400/?man,dean',
              },
            ].map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-#FFAB00 rounded-lg overflow-hidden shadow-soft"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-1">{leader.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{leader.position}</p>
                  <p className="text-gray-600">{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
            >
              Learn More About Our Team
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      */}
      
      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-#FFAB00">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience Education Institute
          </h2>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto mb-8">
            We invite you to visit our campus, meet our faculty, and discover the learning environment we offer to our students.
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
)};

export default PrincipalMessage;