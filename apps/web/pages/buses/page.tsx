import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusCard from '../../components/BusCard';

const BusesPage = () => {
  const [buses, setBuses] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBuses = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('/api/buses');
        setBuses(response.data);
      } catch (err) {
        setError('Failed to fetch buses');
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredBuses = buses.filter((bus) =>
    bus.name.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedBuses = filteredBuses.sort((a, b) => {
    if (sort === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sort === 'details') {
      return a.details.localeCompare(b.details);
    }
    return 0;
  });

  return (
    <div>
      <h1>Buses</h1>
      <div>
        <label>Filter:</label>
        <input type="text" value={filter} onChange={handleFilterChange} />
      </div>
      <div>
        <label>Sort:</label>
        <select value={sort} onChange={handleSortChange}>
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="details">Details</option>
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {sortedBuses.map((bus) => (
          <BusCard key={bus.id} bus={bus} />
        ))}
      </div>
    </div>
  );
};

export default BusesPage;
