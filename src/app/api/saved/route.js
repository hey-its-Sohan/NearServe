// src/app/api/saved/route.js
import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

export const POST = async (request) => {
  let client;

  try {
    const body = await request.json();
    const { serviceId, userEmail, serviceDetails } = body;

    console.log('Save service request from:', userEmail);

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
    const savedCollection = database.collection('savedServices');
    const usersCollection = database.collection('users');

    // Find user by email to get MongoDB _id
    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      );
    }

    // Check if already saved
    const existing = await savedCollection.findOne({
      serviceId: new ObjectId(serviceId),
      userId: user._id
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Service already saved',
        savedId: existing._id
      });
    }

    const savedService = {
      serviceId: new ObjectId(serviceId),
      userId: user._id,
      userEmail: userEmail,
      serviceDetails,
      createdAt: new Date()
    };

    const result = await savedCollection.insertOne(savedService);

    return NextResponse.json({
      success: true,
      message: 'Service saved successfully',
      savedId: result.insertedId
    });

  } catch (error) {
    console.error('Save service error:', error);
    return NextResponse.json(
      { error: 'Failed to save service: ' + error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  let client;

  try {
    const body = await request.json();
    const { savedId } = body;

    if (!savedId) {
      return NextResponse.json(
        { error: 'Saved Service ID is required' },
        { status: 400 }
      );
    }

    // Validate savedId
    if (!ObjectId.isValid(savedId)) {
      return NextResponse.json(
        { error: 'Invalid Saved Service ID format' },
        { status: 400 }
      );
    }

    client = new MongoClient(process.env.MONGODB_URI);

    const database = client.db(process.env.DB_NAME);
    const savedCollection = database.collection('savedServices');

    // Delete the saved service
    const result = await savedCollection.deleteOne({
      _id: new ObjectId(savedId)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Saved service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Service removed from saved list'
    });

  } catch (error) {
    console.error('Delete saved service error:', error);
    return NextResponse.json(
      { error: 'Failed to remove saved service: ' + error.message },
      { status: 500 }
    );
  }
};