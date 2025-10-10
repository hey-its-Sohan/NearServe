// src/app/dashboard/booked/BookedServicesClient.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, Trash2, Calendar, MapPin, User, Phone, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';


const BookedServicesClient = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch booked services
  const fetchBookings = async () => {
    if (!session?.user?.email) return;

    try {
      const response = await fetch('/api/bookings/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: session.user.email
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      } else {
        toast.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [session]);

  const handleViewDetails = (serviceId) => {
    router.push(`/allservices/${serviceId}`);
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setDeletingId(bookingId);
    try {
      const response = await fetch('/api/bookings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bookingId
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Booking cancelled successfully');
        // Remove the booking from the list
        setBookings(prev => prev.filter(booking => booking._id !== bookingId));
      } else {
        toast.error(result.error || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Delete booking error:', error);
      toast.error('Failed to cancel booking');
    } finally {
      setDeletingId(null);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-500', text: 'Pending' },
      confirmed: { color: 'bg-green-500', text: 'Confirmed' },
      completed: { color: 'bg-blue-500', text: 'Completed' },
      cancelled: { color: 'bg-red-500', text: 'Cancelled' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <Badge className={`${config.color} text-white`}>
        {config.text}
      </Badge>
    );
  };


  if (!session) {
    return (
      <div className="min-h-screen bg-background py-20 ">
        <div className="fix-alignment">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Access Denied
            </h1>
            <p className="text-gray mb-4">Please sign in to view your bookings.</p>
            <Button onClick={() => router.push('/signin')}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background ">
      <div className="fix-alignment">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/dashboard')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                My Bookings
              </h1>
              <p className="text-gray mt-2">
                Manage and view all your booked services
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'}
          </Badge>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Bookings Yet
              </h3>
              <p className="text-gray mb-6">
                You haven't booked any services yet. Explore our services to get started.
              </p>
              <Button onClick={() => router.push('/allservices')}>
                Browse Services
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking._id} className="card-animate">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between mb-2">
                        <CardTitle className="text-xl mb-2">
                          {booking.serviceDetails.title}
                        </CardTitle>
                        {getStatusBadge(booking.status)}
                      </div>
                      <CardDescription className="text-lg">
                        {booking.serviceDetails.description}
                      </CardDescription>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(booking.serviceDetails.price)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Service Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Service Details</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          {booking.serviceDetails.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{booking.serviceDetails.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.serviceDetails.location}</span>
                      </div>
                    </div>

                    {/* Provider Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Provider Details</h4>
                      <div className="flex items-center gap-2 text-sm text-gray">
                        <User className="w-4 h-4" />
                        <span>{booking.serviceDetails.providerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray">
                        <Phone className="w-4 h-4" />
                        <span>{booking.serviceDetails.contact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-gray">
                      <Calendar className="w-4 h-4" />
                      <span>Booked on: {formatDate(booking.createdAt)}</span>
                      {booking.bookingDate && (
                        <span>• For: {formatDate(booking.bookingDate)}</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col lg:flex-row gap-2">
                      <Button

                        size="sm"
                        onClick={() => handleViewDetails(booking.serviceId)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBooking(booking._id)}
                        disabled={deletingId === booking._id}
                        className="flex items-center gap-2"
                      >
                        {deletingId === booking._id ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4" />
                            Cancel Booking
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedServicesClient;