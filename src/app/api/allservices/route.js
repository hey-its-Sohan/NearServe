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