// src/app/api/bookings/route.js
import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

export const POST = async (request) => {
  let client;

  try {
    const body = await request.json();
    const { serviceId, userEmail, serviceDetails, bookingDate } = body;

    console.log('Booking request from:', userEmail);

    if (!serviceId || !userEmail) {
      return NextResponse.json(
        { error: 'Service ID and User Email are required' },
        { status: 400 }
      );
    }

    // Validate serviceId
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

    // Find user by email to get MongoDB _id
    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      );
    }

    const booking = {
      serviceId: new ObjectId(serviceId),
      userId: user._id,
      userEmail: userEmail,
      serviceDetails,
      bookingDate: bookingDate || new Date(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await bookingsCollection.insertOne(booking);

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

export const DELETE = async (request) => {
  let client;

  try {
    const body = await request.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    // Validate bookingId
    if (!ObjectId.isValid(bookingId)) {
      return NextResponse.json(
        { error: 'Invalid Booking ID format' },
        { status: 400 }
      );
    }

    client = new MongoClient(process.env.MONGODB_URI);

    const database = client.db(process.env.DB_NAME);
    const bookingsCollection = database.collection('bookings');

    // Delete the booking
    const result = await bookingsCollection.deleteOne({
      _id: new ObjectId(bookingId)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully'
    });

  } catch (error) {
    console.error('Delete booking error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel booking: ' + error.message },
      { status: 500 }
    );
  }
};