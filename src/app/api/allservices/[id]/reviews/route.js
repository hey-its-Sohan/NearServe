import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  let client;

  try {
    const { id } = params;
    const { userEmail, userName, userImage, rating, comment } = await request.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      );
    }

    if (!userEmail || !userName || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    client = new MongoClient(process.env.MONGODB_URI);

    const database = client.db(process.env.DB_NAME);
    const collection = database.collection('allServices');

    // Create review object
    const review = {
      _id: new ObjectId(),
      userEmail,
      userName,
      userImage: userImage || null,
      rating: parseInt(rating),
      comment,
      date: new Date()
    };

    // Add review to the service's reviews array
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $push: {
          reviews: {
            $each: [review],
            $position: 0 // Add at the beginning of the array
          }
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      review
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to add review: ' + error.message },
      { status: 500 }
    );
  }
};