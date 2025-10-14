// src/app/api/bookings/route.js - POST method only
import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

export const POST = async (request) => {
  let client;

  try {
    const body = await request.json();
    const { serviceId, userEmail, serviceDetails, bookingDate } = body;

    console.log('Booking request from:', userEmail);
    console.log('Service details received:', serviceDetails);

    if (!serviceId || !userEmail) {
      return NextResponse.json(
        { error: 'Service ID and User Email are required' },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(serviceId)) {
      return NextResponse.json(
        { error: 'Invalid Service ID format' },
        { status: 400 }
      );
    }

    client = new MongoClient(process.env.MONGODB_URI);

    const database = client.db(process.env.DB_NAME);
    const bookingsCollection = database.collection('bookings');
    const usersCollection = database.collection('users');
    const servicesCollection = database.collection('allServices');

    // Find user by email to get MongoDB _id
    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      );
    }

    // Get the service to ensure we have the correct providerId
    const service = await servicesCollection.findOne({ _id: new ObjectId(serviceId) });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Use providerId from the service, not from serviceDetails
    const providerId = service.providerId;

    if (!providerId) {
      return NextResponse.json(
        { error: 'Service provider not found. Please contact support.' },
        { status: 400 }
      );
    }

    console.log('Using providerId from service:', providerId);

    const booking = {
      serviceId: new ObjectId(serviceId),
      userId: user._id,
      userEmail: userEmail,
      serviceDetails: {
        ...serviceDetails,
        providerId: providerId // Override with correct providerId from service
      },
      bookingDate: bookingDate || new Date(),
      status: 'pending',
      providerId: new ObjectId(providerId),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('Creating booking with providerId:', providerId);

    const result = await bookingsCollection.insertOne(booking);

    console.log('Booking created with ID:', result.insertedId);

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      bookingId: result.insertedId
    });

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking: ' + error.message },
      { status: 500 }
    );
  }
};