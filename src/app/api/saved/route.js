import dbConnect from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { serviceId, userId, serviceDetails } = await request.json();

    if (!serviceId || !userId) {
      return NextResponse.json(
        { error: 'Service ID and User ID are required' },
        { status: 400 }
      );
    }

    const collection = dbConnect('savedServices');

    // Check if already saved
    const existing = await collection.findOne({
      serviceId: new ObjectId(serviceId),
      userId: new ObjectId(userId)
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
      userId: new ObjectId(userId),
      serviceDetails,
      createdAt: new Date()
    };

    const result = await collection.insertOne(savedService);

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