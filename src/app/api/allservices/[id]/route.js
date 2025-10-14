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

export const PATCH = async (request, { params }) => {
  let client;
  try {
    const { id } = params;
    const updatedData = await request.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
    }

    client = new MongoClient(process.env.MONGODB_URI);
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("allServices");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service updated successfully" });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
};

// 🔹 DELETE — Remove a service
export const DELETE = async (request, { params }) => {
  let client;
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
    }

    client = new MongoClient(process.env.MONGODB_URI);
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("allServices");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
};