import { MongoClient } from 'mongodb';
import { NextResponse } from "next/server";

export const GET = async () => {
  let client;

  try {
    client = new MongoClient(process.env.MONGODB_URI);

    const database = client.db(process.env.DB_NAME);
    const bookingsCollection = database.collection('bookings');

    // Get all bookings with service details, sorted by latest first
    const bookings = await bookingsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      bookings: bookings.map(booking => ({
        ...booking,
        _id: booking._id.toString(),
        serviceId: booking.serviceId?.toString(),
        userId: booking.userId?.toString()
      }))
    });

  } catch (error) {
    console.error('Get all bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings: ' + error.message },
      { status: 500 }
    );
  }
};