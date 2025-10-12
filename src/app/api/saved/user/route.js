// src/app/api/saved/user/route.js
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
    const savedCollection = database.collection('savedServices');
    const usersCollection = database.collection('users');

    // Find user by email to get MongoDB _id
    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({
        savedServices: [],
        message: 'User not found'
      });
    }

    // Get all saved services for this user, sorted by latest first
    const savedServices = await savedCollection
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      savedServices: savedServices.map(service => ({
        ...service,
        _id: service._id.toString(),
        serviceId: service.serviceId.toString()
      }))
    });

  } catch (error) {
    console.error('Get user saved services error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch saved services: ' + error.message },
      { status: 500 }
    );
  }
};