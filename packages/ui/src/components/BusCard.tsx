import React from 'react';

interface BusCardProps {
  bus: {
    name: string;
    details: string;
    price: number;
  };
}

const BusCard: React.FC<BusCardProps> = ({ bus }) => {
  return (
    <div className="bus-card">
      <h2>{bus.name}</h2>
      <p>{bus.details}</p>
      <p>Price: {bus.price}</p>
    </div>
  );
};

export default BusCard;
