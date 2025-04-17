import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeatPicker = ({ busId, onSeatSelect }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSeats = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`/api/buses/${busId}/seats`);
        setSeats(response.data);
      } catch (err) {
        setError('Failed to fetch seats');
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [busId]);

  const handleSeatClick = async (seat) => {
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/seats/lock', { busId, seatNumber: seat.number });
      setSelectedSeat(seat);
      onSeatSelect(seat);
    } catch (err) {
      setError('Failed to lock seat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Select a Seat</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="seat-picker">
        {seats.map((seat) => (
          <button
            key={seat.number}
            onClick={() => handleSeatClick(seat)}
            disabled={seat.locked || loading}
            className={seat === selectedSeat ? 'selected' : ''}
          >
            {seat.number}
          </button>
        ))}
      </div>
    </div>
  );
};

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
