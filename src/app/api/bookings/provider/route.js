import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

export const GET = async (request) => {
  let client;

  try {
    // Get the user email from query parameters
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');

    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email is required' },
        { status: 400 }
      );
    }

    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const database = client.db(process.env.DB_NAME);
    const usersCollection = database.collection('users');
    const bookingsCollection = database.collection('bookings');

    // Get current user
    const currentUser = await usersCollection.findOne({ email: userEmail });

    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is a provider
    if (currentUser.role !== 'provider') {
      return NextResponse.json(
        { error: 'Access denied. Provider role required.' },
        { status: 403 }
      );
    }

    // Get bookings for this provider
    const bookings = await bookingsCollection
      .find({
        providerId: currentUser._id
      })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      bookings: bookings.map(booking => ({
        ...booking,
        _id: booking._id.toString(),
        serviceId: booking.serviceId?.toString(),
        userId: booking.userId?.toString(),
        providerId: booking.providerId?.toString()
      }))
    });

  } catch (error) {
    console.error('Get provider bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings: ' + error.message },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
};