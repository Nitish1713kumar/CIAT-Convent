import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-yellow-600 text-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
             <Link to="/" className="flex items-center space-x-3">
                         <img
                           src="/logo.png"
                           alt="Logo"
                           className="w-12 h-12 md:w-14 md:h-14 rounded shadow-lg hover:scale-105 transition-transform duration-200"
                         />
             
                         <div className="flex flex-col">
                           <h1 className="text-md lg:text-lg font-semibold text-primary-800 tracking-wide">
                             CIAT CONVENT
                           </h1>
                           <p className="text-xs lg:text-sm text-gray-600">Sr. Sec. School</p>
                         </div>
                       </Link>
            </div>
            <p className="text-gray-700 mb-4">
              Committed to providing excellence in education and shaping future leaders through innovation and integrity.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-800 hover:text-blue-700 transition">
                <FiFacebook size={22} />
              </a>
              <a href="https://twitter.com" className="text-gray-800 hover:text-blue-500 transition">
                <FiTwitter size={22} />
              </a>
              <a href="https://instagram.com" className="text-gray-800 hover:text-pink-500 transition">
                <FiInstagram size={22} />
              </a>
              <a href="https://youtube.com" className="text-gray-800 hover:text-red-600 transition">
                <FiYoutube size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-300 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/vision-mission" className="hover:underline">Vision & Mission</Link></li>
              <li><Link to="/principal-message" className="hover:underline">Principal's Message</Link></li>
              <li><Link to="/admissions" className="hover:underline">Admissions</Link></li>
              <li><Link to="/news" className="hover:underline">News & Updates</Link></li>
              <li><Link to="/gallery" className="hover:underline">Gallery</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-300 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="mt-1 text-gray-800" />
                <span>Kanjhwala, North West Delhi, 110081</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-gray-800" />
                <span>+91 85957 92883</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-gray-800" />
                <a href="mailto:info@educationinstitute.com" className="hover:underline">Ciatschool1998@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-300 pb-2">Newsletter</h3>
            <p className="text-gray-700 mb-4">Subscribe to receive updates and news about our institution.</p>
            <form className="space-y-2">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-2 rounded bg-white border border-gray-300 focus:ring-2 focus:ring-yellow-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-300 text-center text-gray-700 text-sm">
          <p>© {currentYear} CIAT Convent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
