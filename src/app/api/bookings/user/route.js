// src/app/api/bookings/user/route.js
import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

export const POST = async (request) => {
  let client;

  try {
    const body = await request.json();
    const { userEmail } = body;

    if (!userEmail) {
      return NextResponse.json(
        { error: 'User Email is required' },
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
      return NextResponse.json({
        bookings: [],
        message: 'User not found'
      });
    }

    // Get all bookings for this user, sorted by latest first
    const bookings = await bookingsCollection
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      bookings: bookings.map(booking => ({
        ...booking,
        _id: booking._id.toString(),
        serviceId: booking.serviceId.toString()
      }))
    });

  } catch (error) {
    console.error('Get user bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings: ' + error.message },
      { status: 500 }
    );
  }
};