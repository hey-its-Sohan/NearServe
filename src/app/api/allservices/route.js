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
  }
};

// Post Api

export const POST = async (req) => {
  let client;

  try {
    const body = await req.json();

    console.log('API Received service data:', body);

    // Check environment variables
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    if (!process.env.DB_NAME) {
      throw new Error('DB_NAME environment variable is not defined');
    }

    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'price', 'location', 'providerName', 'contact'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate providerId
    if (!body.providerId) {
      return NextResponse.json(
        { error: 'Provider ID is required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI);

    const database = client.db(process.env.DB_NAME);
    const collection = database.collection('allServices');

    // Prepare service data
    const serviceData = {
      title: body.title,
      description: body.description,
      longDescription: body.longDescription || "",
      category: body.category,
      price: parseInt(body.price) || 0,
      location: body.location,
      providerName: body.providerName,
      contact: body.contact,
      image: body.image || "",
      availability: body.availability || 'Available',
      rating: parseFloat(body.rating) || 0,
      // CRITICAL: Ensure providerId is stored
      providerId: body.providerId,
      providerEmail: body.providerEmail || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      reviews: []
    };

    console.log('Saving service to database with providerId:', serviceData.providerId);

    const result = await collection.insertOne(serviceData);

    console.log('Service saved with ID:', result.insertedId);

    return NextResponse.json(
      {
        message: "Service added successfully!",
        insertedId: result.insertedId,
        service: serviceData
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to add service',
        details: error.message
      },
      { status: 500 }
    );
  }
};