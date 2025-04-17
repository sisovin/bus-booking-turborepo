import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/buses', {
        params: { city, date },
      });
      setBuses(response.data);
    } catch (err) {
      setError('Failed to fetch buses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Buses</h1>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {buses.map((bus) => (
          <li key={bus.id}>{bus.details}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
