import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatCounter = ({ stats }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const [counts, setCounts] = useState(stats.map(() => 0));
  
  useEffect(() => {
    if (!isInView) return;
    
    const intervals = stats.map((stat, index) => {
      const duration = 2000; // 2 seconds to count up
      const steps = 50; // number of steps
      const increment = stat.value / steps;
      let count = 0;
      
      return setInterval(() => {
        count += increment;
        if (count >= stat.value) {
          count = stat.value;
          clearInterval(intervals[index]);
        }
        
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(count);
          return newCounts;
        });
      }, duration / steps);
    });
    
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [isInView, stats]);

  return (
    <section ref={sectionRef} className="py-16 bg-primary-900 text-#FFAB00">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-300 mb-2">
                {counts[index].toLocaleString()}+
              </div>
              <div className="text-lg text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatCounter;