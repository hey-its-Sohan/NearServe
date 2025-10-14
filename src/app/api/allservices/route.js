import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

export const GET = async (request) => {
  let client;

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const providerId = searchParams.get('providerId');

    console.log('API: Fetching services with params:', { email, providerId });

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    if (!process.env.DB_NAME) {
      throw new Error('DB_NAME environment variable is not defined');
    }

    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const database = client.db(process.env.DB_NAME);
    const collection = database.collection('allServices');

    let query = {};

    // Filter by providerId if provided
    if (providerId) {
      if (!ObjectId.isValid(providerId)) {
        return NextResponse.json(
          { error: 'Invalid provider ID format' },
          { status: 400 }
        );
      }
      query.providerId = providerId;
    }
    // Fallback: Filter by provider email if provided
    else if (email) {
      query.providerEmail = email;
    }

    console.log('API: Querying with:', query);

    const data = await collection.find(query).toArray();
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
    }
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