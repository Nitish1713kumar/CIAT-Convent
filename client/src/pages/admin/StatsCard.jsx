import React from 'react';
import { Link } from 'react-router-dom';

const StatsCard = ({ title, count, icon, linkTo, color }) => {
  return (
    <Link to={linkTo} className={`block p-6 rounded-lg shadow-md text-white ${color} transition hover:shadow-lg`}>
      <div className="flex items-center space-x-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </div>
    </Link>
  );
};

export default StatsCard;
