// src/app/api/allservices/route.js
import { MongoClient } from 'mongodb';
import { NextResponse } from "next/server";

export const GET = async () => {
  let client;

  try {
    console.log('API: Starting fetch...');

    // Check environment variables
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    if (!process.env.DB_NAME) {
      throw new Error('DB_NAME environment variable is not defined');
    }

    console.log('API: Connecting to MongoDB...');

    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log('API: Connected to MongoDB successfully');

    const database = client.db(process.env.DB_NAME);
    const collection = database.collection('allServices');

    // Check if collection exists
    const collections = await database.listCollections({ name: 'allServices' }).toArray();
    console.log('API: Collections found:', collections.length);

    if (collections.length === 0) {
      // Collection doesn't exist, return empty array
      console.log('API: allServices collection does not exist');
      return NextResponse.json([]);
    }

    const data = await collection.find().toArray();
    console.log(`API: Found ${data.length} services`);

    return NextResponse.json(data);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch services from database',
        details: error.message
      },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log('API: MongoDB connection closed');
    }
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();
    const collection = await dbConnect('allServices');

    const result = await collection.insertOne(body);

    return NextResponse.json(
      { message: "Service added successfully!", insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to add service' },
      { status: 500 }
    );
  }
};