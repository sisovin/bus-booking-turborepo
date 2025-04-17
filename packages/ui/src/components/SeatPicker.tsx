import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Seat {
  number: string;
  locked: boolean;
}

interface SeatPickerProps {
  busId: string;
  onSeatSelect: (seat: Seat) => void;
}

const SeatPicker: React.FC<SeatPickerProps> = ({ busId, onSeatSelect }) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSeats = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`/api/seats/${busId}`);
        setSeats(response.data);
      } catch (err) {
        setError('Failed to fetch seats');
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [busId]);

  const handleSeatClick = async (seat: Seat) => {
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

export default SeatPicker;
