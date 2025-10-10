import clientPromise from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, role, image } = await req.json();
    console.log(req);
    if (!name || !email || !password || !role || !image) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const usersCollection = db.collection("users");

    // check if user exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user
    const newUser = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      role,
      image,
      createdAt: new Date(),
    });

    return Response.json(
      { message: "User created successfully", userId: newUser.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
