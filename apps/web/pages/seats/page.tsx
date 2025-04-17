import React, { useState } from 'react';
import SeatPicker from '../../components/SeatPicker';

const SeatsPage = ({ busId }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat);
  };

  return (
    <div>
      <h1>Seats</h1>
      <SeatPicker busId={busId} onSeatSelect={handleSeatSelect} />
      {selectedSeat && (
        <div>
          <h2>Selected Seat</h2>
          <p>{selectedSeat.number}</p>
        </div>
      )}
    </div>
  );
};

export default SeatsPage;
