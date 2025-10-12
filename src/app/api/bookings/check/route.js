// src/app/api/bookings/check/route.js
import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

export const POST = async (request) => {
  let client;

  try {
    const body = await request.json();
    const { serviceId, userEmail } = body;

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
    await client.connect();

    const database = client.db(process.env.DB_NAME);
    const bookingsCollection = database.collection('bookings');
    const usersCollection = database.collection('users');

    // Find user by email to get MongoDB _id
    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({
        isBooked: false,
        message: 'User not found'
      });
    }

    // Check if booking exists
    const existingBooking = await bookingsCollection.findOne({
      serviceId: new ObjectId(serviceId),
      userId: user._id
    });

    return NextResponse.json({
      isBooked: !!existingBooking,
      booking: existingBooking || null
    });

  } catch (error) {
    console.error('Check booking error:', error);
    return NextResponse.json(
      { error: 'Failed to check booking status: ' + error.message },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
};