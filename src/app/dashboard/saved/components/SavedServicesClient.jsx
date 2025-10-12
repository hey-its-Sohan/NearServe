// src/app/dashboard/saved/SavedServicesClient.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, Trash2, Heart, MapPin, User, Phone, Star, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';

const SavedServicesClient = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [savedServices, setSavedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch saved services
  const fetchSavedServices = async () => {
    if (!session?.user?.email) return;

    try {
      const response = await fetch('/api/saved/user', {
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
        setSavedServices(data.savedServices || []);
      } else {
        toast.error('Failed to fetch saved services');
      }
    } catch (error) {
      console.error('Error fetching saved services:', error);
      toast.error('Failed to load saved services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchSavedServices();
    } else {
      setLoading(false);
    }
  }, [session]);

  const handleViewDetails = (serviceId) => {
    router.push(`/allservices/${serviceId}`);
  };

  const handleRemoveSaved = async (savedId, serviceTitle) => {
    if (!confirm(`Are you sure you want to remove "${serviceTitle}" from your saved services?`)) {
      return;
    }

    setDeletingId(savedId);
    try {
      const response = await fetch('/api/saved', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          savedId: savedId
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Service removed from saved list');
        // Remove the service from the list
        setSavedServices(prev => prev.filter(service => service._id !== savedId));
      } else {
        toast.error(result.error || 'Failed to remove service');
      }
    } catch (error) {
      console.error('Remove saved service error:', error);
      toast.error('Failed to remove service');
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

  if (!session) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="fix-alignment">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Access Denied
            </h1>
            <p className="text-gray mb-4">Please sign in to view your saved services.</p>
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
                Saved Services
              </h1>
              <p className="text-gray mt-2">
                Your favorite services for quick access
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {savedServices.length} {savedServices.length === 1 ? 'Service' : 'Services'}
          </Badge>
        </div>

        {/* Saved Services List */}
        {savedServices.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-gray-400 mb-4">
                <Heart className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Saved Services
              </h3>
              <p className="text-gray mb-6">
                You haven't saved any services yet. Save services you like to access them quickly later.
              </p>
              <Button onClick={() => router.push('/allservices')}>
                Browse Services
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {savedServices.map((savedService) => (
              <Card key={savedService._id} className="card-animate">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between mb-2">
                        <CardTitle className="text-xl mb-2">
                          {savedService.serviceDetails.title}
                        </CardTitle>
                        <Badge className="bg-pink-500 text-white">
                          <Heart className="w-3 h-3 mr-1" />
                          Saved
                        </Badge>
                      </div>
                      <CardDescription className="text-lg">
                        {savedService.serviceDetails.description}
                      </CardDescription>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(savedService.serviceDetails.price)}
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
                          {savedService.serviceDetails.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{savedService.serviceDetails.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray">
                        <MapPin className="w-4 h-4" />
                        <span>{savedService.serviceDetails.location}</span>
                      </div>
                    </div>

                    {/* Provider Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Provider Details</h4>
                      <div className="flex items-center gap-2 text-sm text-gray">
                        <User className="w-4 h-4" />
                        <span>{savedService.serviceDetails.providerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray">
                        <Phone className="w-4 h-4" />
                        <span>{savedService.serviceDetails.contact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Saved Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-gray">
                      <Calendar className="w-4 h-4" />
                      <span>Saved on: {formatDate(savedService.createdAt)}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleViewDetails(savedService.serviceId)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveSaved(
                          savedService._id,
                          savedService.serviceDetails.title
                        )}
                        disabled={deletingId === savedService._id}
                        className="flex items-center gap-2"
                      >
                        {deletingId === savedService._id ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                            Removing...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4" />
                            Remove
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

export default SavedServicesClient;