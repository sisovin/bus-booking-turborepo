import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { checkAuth } from '../../../utils/auth';

const BookingDetailsPage = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          router.push('/login');
          return;
        }
        const response = await axios.get(`/api/bookings/${id}`);
        setBooking(response.data);
      } catch (err) {
        setError('Failed to fetch booking details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookingDetails();
    }
  }, [id, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Booking Details</h1>
      {booking ? (
        <div>
          <p>ID: {booking.id}</p>
          <p>Details: {booking.details}</p>
          {/* Add more booking details as needed */}
        </div>
      ) : (
        <p>No booking details found</p>
      )}
    </div>
  );
};

export default BookingDetailsPage;
