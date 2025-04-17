import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { checkAuth } from '../../../utils/auth';

const BookingDetailsPage = ({ id }) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get(`/api/bookings/${id}`);
        setBooking(response.data);
      } catch (err) {
        setError('Failed to fetch booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
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
          <p>Booking ID: {booking.id}</p>
          <p>Bus ID: {booking.busId}</p>
          <p>Seat Number: {booking.seatNumber}</p>
          <p>Created At: {new Date(booking.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(booking.updatedAt).toLocaleString()}</p>
        </div>
      ) : (
        <p>No booking details available</p>
      )}
    </div>
  );
};

export default BookingDetailsPage;
