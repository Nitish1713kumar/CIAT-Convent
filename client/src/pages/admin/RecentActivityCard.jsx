import React from 'react';

const RecentActivityCard = ({ activity }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-sm flex justify-between items-center">
      <div>
        <h4 className="text-sm font-semibold">{activity.title}</h4>
        <p className="text-xs text-gray-500">
          {activity.type.toUpperCase()} • {new Date(activity.date).toLocaleString()} • {activity.user}
        </p>
      </div>
      <span className="text-gray-400 text-lg">→</span>
    </div>
  );
};

export default RecentActivityCard;
