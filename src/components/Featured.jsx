'use client';
import React, { useState, useEffect } from 'react';
import { Star, MapPin, User, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Featured = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/allservices');
        if (res.ok) {
          const allServices = await res.json();
          setFeaturedServices(allServices.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching featured services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="fix-alignment">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray mt-4">Loading featured services...</p>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="py-20">
      <div className="fix-alignment">
        <div className="text-center mb-12">
          <h1 className="heading">Featured Services</h1>
          <p className="text-gray text-xl">Top-rated providers in your area</p>
        </div>

        {/* Featured Services Grid */}
        {featuredServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray text-lg">No featured services available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Card key={service._id} className="card-animate group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {service.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{service.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-4">
                  {/* Service Image */}
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={service.availability === 'Available' ? 'default' : 'secondary'}
                        className={service.availability === 'Available' ? 'bg-green-500' : 'bg-orange-500'}
                      >
                        {service.availability}
                      </Badge>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(service.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{service.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span className="line-clamp-1">{service.providerName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{service.contact}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Link className='w-full' href={`allservices/${service._id}`}>
                    <Button className="w-full primary-btn group">
                      View Details
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* View All Services Button */}
        {featuredServices.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="px-8 py-3 text-lg"
              onClick={() => window.location.href = '/allservices'}
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Featured;