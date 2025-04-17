import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from '../../components/SearchForm';

const SearchPage = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city, date) => {
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
      <SearchForm onSearch={handleSearch} />
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
