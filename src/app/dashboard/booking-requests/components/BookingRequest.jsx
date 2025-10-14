'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  MapPin,
  Search,
  Filter,
  RefreshCw,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const BookingRequest = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingBooking, setUpdatingBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchBookings();
    }
  }, [status, session]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bookings/provider?email=${encodeURIComponent(session.user.email)}`);

      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      } else if (response.status === 401) {
        toast.error('Please sign in to view bookings');
        router.push('/signin');
      } else if (response.status === 403) {
        toast.error('Provider access required');
        router.push('/');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load booking requests');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      setUpdatingBooking(bookingId);

      const response = await fetch('/api/bookings/status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          status
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setBookings(prev =>
          prev.map(booking =>
            booking._id === bookingId
              ? { ...booking, status, updatedAt: new Date().toISOString() }
              : booking
          )
        );

        toast.success(`Booking ${status} successfully`);
      } else {
        toast.error(result.error || `Failed to ${status} booking`);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    } finally {
      setUpdatingBooking(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: 'secondary', icon: Clock, text: 'Pending' },
      accepted: { variant: 'default', icon: CheckCircle, text: 'Accepted' },
      declined: { variant: 'destructive', icon: XCircle, text: 'Declined' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-24 justify-center">
        <IconComponent className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.serviceDetails?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.serviceDetails?.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const acceptedBookings = bookings.filter(b => b.status === 'accepted').length;
  const declinedBookings = bookings.filter(b => b.status === 'declined').length;

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="fix-alignment">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="fix-alignment">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                My Booking Requests
              </h1>
            </div>
            <p className="text-gray">
              Manage booking requests for your services
            </p>
          </div>

          <Button
            onClick={fetchBookings}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-none card-animate">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray">Total Requests</p>
                  <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none card-animate">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray">Pending</p>
                  <p className="text-2xl font-bold text-orange-500">{pendingBookings}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none card-animate">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray">Accepted</p>
                  <p className="text-2xl font-bold text-green-600">{acceptedBookings}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none card-animate">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray">Declined</p>
                  <p className="text-2xl font-bold text-red-600">{declinedBookings}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-none card-animate">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by service, customer email, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2 items-center">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card className="border-none card-animate">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                Booking Requests ({filteredBookings.length})
              </span>
              {pendingBookings > 0 && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  {pendingBookings} Pending
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {bookings.length === 0 ? 'No booking requests yet' : 'No matching bookings found'}
                </h3>
                <p className="text-gray">
                  {bookings.length === 0
                    ? 'When customers book your services, requests will appear here'
                    : 'Try adjusting your search or filters'
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Service & Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Service Details</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Booking Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-start gap-3">
                            <img
                              src={booking.serviceDetails?.image}
                              alt={booking.serviceDetails?.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-foreground line-clamp-1">
                                {booking.serviceDetails?.title}
                              </h4>
                              <div className="flex items-center gap-1 text-sm text-gray mt-1">
                                <User className="w-3 h-3" />
                                {booking.userEmail}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray">
                                <MapPin className="w-3 h-3" />
                                {booking.serviceDetails?.location}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <div className="font-medium text-foreground">
                              {booking.serviceDetails?.category}
                            </div>
                            <div className="text-gray mt-1 line-clamp-2">
                              {booking.serviceDetails?.description}
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-semibold text-primary">
                            {formatPrice(booking.serviceDetails?.price || 0)}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-sm text-gray">
                            {formatDate(booking.bookingDate)}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          {getStatusBadge(booking.status)}
                        </td>

                        <td className="py-4 px-4">
                          {booking.status === 'pending' ? (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => updateBookingStatus(booking._id, 'accepted')}
                                disabled={updatingBooking === booking._id}
                              >
                                {updatingBooking === booking._id ? (
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                ) : (
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                )}
                                Accept
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateBookingStatus(booking._id, 'declined')}
                                disabled={updatingBooking === booking._id}
                              >
                                {updatingBooking === booking._id ? (
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                ) : (
                                  <XCircle className="w-3 h-3 mr-1" />
                                )}
                                Decline
                              </Button>
                            </div>
                          ) : (
                            <div className="text-sm text-gray text-center">
                              {booking.status === 'accepted' ? 'Accepted' : 'Declined'}
                              <div className="text-xs mt-1">
                                {formatDate(booking.updatedAt)}
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingRequest;