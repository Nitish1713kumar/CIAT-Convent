import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Vision & Mission', path: '/vision-mission' },
    { name: "Principal's Message", path: '/principal-message' },
    { name: 'Notice Board', path: '/news' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Contact', path: '/contact' },
    { name: 'About Us', path: '/about' }
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`w-full fixed top-0 z-[1000] transition-all duration-300 ${
          isScrolled ? 'bg-yellow-600 shadow-lg py-2 md:py-4' : 'bg-yellow-700 py-4 md:py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium text-sm md:text-md hover:text-primary-600 transition ${
                  location.pathname === item.path ? 'text-primary-600 font-semibold' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* User authentication */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition">
                  <FiUser size={20} />
                  <span className="hidden lg:block">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-yellow-600 rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {isAdmin() && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-700 hover:text-primary-600"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-700 hover:text-primary-600"
                  >
                    <div className="flex items-center space-x-1">
                      <FiLogOut size={14} />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded font-medium text-lg text-gray-700 transition">
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-yellow-500 shadow-lg fixed top-16 left-0 w-full z-[1050]"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`py-2 px-4 text-sm font-medium transition ${
                      location.pathname === item.path
                        ? 'bg-yellow-300 text-primary-600 font-semibold'
                        : 'text-gray-700 hover:bg-yellow-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* User authentication */}
                {user ? (
                  <>
                    {isAdmin() && (
                      <Link
                        to="/admin/dashboard"
                        className="py-2 px-4 text-gray-700 hover:bg-yellow-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="text-left py-2 px-4 text-gray-700 hover:bg-yellow-300"
                    >
                      <div className="flex items-center space-x-2">
                        <FiLogOut size={16} />
                        <span>Logout</span>
                      </div>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 transition font-medium text-sm md:text-md "
                  >
                    Login
                  </Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add padding to prevent content from being hidden behind fixed header */}
      <div className="pt-20"></div>
    </>
  );
};

export default Header;
