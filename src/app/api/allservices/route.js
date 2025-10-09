import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    console.log('API: Starting to fetch services...');

    const collection = dbConnect('allServices');
    const data = await collection.find().toArray();

    console.log('API: Found', data.length, 'services');

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services from database' },
      { status: 500 }
    );
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