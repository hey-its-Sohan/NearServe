import React from 'react';
import AllServicesClient from './AllServicesClient';

const AllServices = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/allservices`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch services: ${res.status}`);
    }

    const services = await res.json();

    return <AllServicesClient initialServices={services} />;

  } catch (error) {
    console.error('Error in AllServices:', error);

    // Fallback to empty array to prevent complete breakdown
    return <AllServicesClient initialServices={[]} />;
  }
};

export default AllServices;