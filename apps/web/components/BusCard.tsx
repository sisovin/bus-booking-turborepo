import React from 'react';

const BusCard = ({ bus }) => {
  return (
    <div className="bus-card">
      <h2>{bus.name}</h2>
      <p>{bus.details}</p>
      <p>Price: {bus.price}</p>
    </div>
  );
};

export default BusCard;
