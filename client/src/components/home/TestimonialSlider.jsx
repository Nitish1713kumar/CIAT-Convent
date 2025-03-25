import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TestimonialSlider = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Vinay Gupta',
      role: 'Developer',
      image: 'https://source.unsplash.com/random/100x100/?woman',
      quote: `The teachers at Education Institute have had a profound impact on my child's academic performance and personal growth. The school's approach to education is balanced and holistic.`,
    },
    {
      id: 2,
      name: 'Rishabh Verma',
      role: 'Alumni (Batch of 2020)',
      image: 'https://source.unsplash.com/random/100x100/?man',
      quote: 'My years at Education Institute prepared me well for university life. The critical thinking skills and discipline I developed have been invaluable in my higher education journey.',
    },
    {
      id: 3,
      name: 'Dr. Adarsh Kumar Pandey',
      role: 'Local University Professor',
      image: 'https://source.unsplash.com/random/100x100/?professor',
      quote: 'Students from Education Institute consistently demonstrate exceptional academic foundations and a genuine passion for learning. The institution clearly excels in preparing students for future academic challenges.',
    },
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            What People Say About Us
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our parents, alumni, and community members about their experiences with our institution.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              currentTestimonial === index && (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="bg-#FFAB00 p-8 md:p-10 rounded-lg shadow-soft"
                >
                  <div className="flex flex-col items-center text-center">
                    
                    <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="mb-2">
                      <h4 className="text-lg font-semibold text-secondary-900">{testimonial.name}</h4>
                      <p className="text-primary-600">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          
          {/* Navigation arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 lg:-translate-x-10 w-10 h-10 rounded-full bg-#FFAB00 shadow-md text-primary-600 flex items-center justify-center hover:bg-primary-50 transition-colors z-10"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 lg:translate-x-10 w-10 h-10 rounded-full bg-#FFAB00 shadow-md text-primary-600 flex items-center justify-center hover:bg-primary-50 transition-colors z-10"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <FiChevronRight size={20} />
          </button>
          
          {/* Dot indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentTestimonial === index ? 'bg-primary-600 w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;