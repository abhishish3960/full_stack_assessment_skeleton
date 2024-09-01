import React from 'react';
import HomeCard from './HomeCard';

const HomeList = ({ homes }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 ">
        {homes.map((home) => (
          <div key={home.street_address} className="flex justify-center">
            <HomeCard home={home} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeList;
