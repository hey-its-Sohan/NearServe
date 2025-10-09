import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

export const POST = async (request) => {
  let client;

  try {
    const { serviceId, userId, serviceDetails, bookingDate } = await request.json();

    if (!serviceId || !userId) {
      return NextResponse.json(
        { error: 'Service ID and User ID are required' },
        { status: 400 }
      );
    }

    client = new MongoClient(process.env.MONGODB_URI);


    const database = client.db(process.env.DB_NAME);
    const collection = database.collection('bookings');

    const booking = {
      serviceId: new ObjectId(serviceId),
      userId: new ObjectId(userId), // You'll need to get this from your auth system
      serviceDetails,
      bookingDate: bookingDate || new Date(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(booking);

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