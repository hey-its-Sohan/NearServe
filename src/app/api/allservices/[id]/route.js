// src/app/api/allservices/[id]/route.js
import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  let client;

  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      );
    }

    client = new MongoClient(process.env.MONGODB_URI);

    const database = client.db(process.env.DB_NAME);
    const collection = database.collection('allServices');

    const service = await collection.findOne({ _id: new ObjectId(id) });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(service);

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service: ' + error.message },
      { status: 500 }
    );
  }
};