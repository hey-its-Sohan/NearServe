'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, MapPin, User, Phone, Clock, Shield, Heart, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';


const ServiceDetailClient = ({ service }) => {
  const router = useRouter();
  const [isBooking, setIsBooking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // userId from auth context
  const userId = '507f1f77bcf86cd799439011';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  // sending booking data to database
  const handleBookNow = async () => {
    if (isBooked) return;

    setIsBooking(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: service._id,
          userId: userId,
          serviceDetails: {
            title: service.title,
            description: service.description,
            category: service.category,
            price: service.price,
            location: service.location,
            providerName: service.providerName,
            contact: service.contact,
            image: service.image
          },
          bookingDate: new Date()
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsBooked(true);
        toast.success('Booking confirmed! We will contact you soon.');
      } else {
        toast.error(result.error || 'Failed to book service');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to book service. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  // sending saved data to database
  const handleSaveService = async () => {
    if (isSaved) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/saved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: service._id,
          userId: userId,
          serviceDetails: {
            title: service.title,
            description: service.description,
            category: service.category,
            price: service.price,
            location: service.location,
            providerName: service.providerName,
            contact: service.contact,
            image: service.image,
            rating: service.rating
          }
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSaved(true);
        toast.success('Service saved to your favorites!');
      } else {
        toast.error(result.error || 'Failed to save service');
      }
    } catch (error) {
      console.error('Save service error:', error);
      toast.error('Failed to save service. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="fix-alignment">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/allservices')}
        >
          ← Back to Services
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Header */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Service Image */}
                <div className="flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-64 h-48 lg:w-80 lg:h-60 rounded-xl object-cover"
                  />
                </div>

                {/* Service Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">
                        {service.category}
                      </Badge>
                      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                        {service.title}
                      </h1>
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(service.price)}
                    </div>
                  </div>

                  <p className="text-gray text-lg mb-4">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{service.rating}</span>
                      <span className="text-gray">Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-gray">{service.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-500" />
                      <Badge className="bg-green-500">{service.availability}</Badge>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mt-6">
                    <Button
                      className={`px-8 py-3 text-lg ${isBooked
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'primary-btn'
                        }`}
                      onClick={handleBookNow}
                      disabled={isBooking || isBooked}
                    >
                      {isBooking ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Booking...
                        </>
                      ) : isBooked ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Booked Successfully
                        </>
                      ) : (
                        <>
                          <Calendar className="w-5 h-5 mr-2" />
                          Book Now
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      className={`px-8 py-3 text-lg border-primary ${isSaved
                        ? 'bg-green-50 border-green-500 text-green-600 hover:bg-green-100'
                        : 'text-primary hover:bg-primary hover:text-white'
                        }`}
                      onClick={handleSaveService}
                      disabled={isSaving || isSaved}
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                          Saving...
                        </>
                      ) : isSaved ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Saved to Favorites
                        </>
                      ) : (
                        <>
                          <Heart className="w-5 h-5 mr-2" />
                          Save for Later
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <Card className="mb-6 border-none">
              <CardHeader>
                <CardTitle className="text-2xl">Service Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray leading-relaxed text-lg">
                  {service.longDescription || service.description}
                </p>
              </CardContent>
            </Card>

            {/* Provider Information */}
            <Card className='border-none'>
              <CardHeader>
                <CardTitle className="text-2xl">Service Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {service.providerName}
                    </h3>
                    <p className="text-gray">Verified Service Provider</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{service.contact}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky border-none top-6">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Secure Booking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatPrice(service.price)}
                  </div>
                  <p className="text-gray">One-time service charge</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray">Service Fee</span>
                    <span className="font-semibold">{formatPrice(service.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray">Platform Fee</span>
                    <span className="font-semibold">{formatPrice(service.price * 0.1)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatPrice(service.price * 1.1)}
                    </span>
                  </div>
                </div>

                <Button
                  className={`w-full py-3 text-lg ${isBooked
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'primary-btn'
                    }`}
                  onClick={handleBookNow}
                  disabled={isBooking || isBooked}
                >
                  {isBooking ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : isBooked ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Booked Successfully
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Proceed to Book
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className={`w-full py-3 text-lg ${isSaved
                    ? 'bg-green-50 border-green-500 text-green-600 hover:bg-green-100'
                    : ''
                    }`}
                  onClick={handleSaveService}
                  disabled={isSaving || isSaved}
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      Saving...
                    </>
                  ) : isSaved ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Saved to Favorites
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-2" />
                      Save for Later
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-gray">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Secure payment • 24/7 support
                </div>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card className='border-none'>
              <CardHeader>
                <CardTitle className="text-xl">Why Choose This Service?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Verified Professional</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>High Customer Rating</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>Quick Response Time</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Local Service Provider</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailClient;