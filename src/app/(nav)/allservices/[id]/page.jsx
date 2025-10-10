
import React from 'react';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './components/ServiceDetailClient';


// Fetch service by ID
const getServiceById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/allservices/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
};

const ServiceDetailPage = async ({ params }) => {
  const service = await getServiceById(params.id);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
};

export default ServiceDetailPage;
