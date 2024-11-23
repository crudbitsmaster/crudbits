import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt'; // Ensure you install bcrypt
export const revalidate = 60
export async function POST(req) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  const dbName = 'crudbits';

  try {
    const secretKey = req.headers.get('key');
    if (secretKey !== process.env.NEXT_PUBLIC_SECRET_KEY) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Connect to the MongoDB client
    await client.connect();
    const data = await req.json();
    const db = client.db(dbName);
    const collection = db.collection('admin');

    // Validate and hash the password
    if (!data.username || !data.password) {
      return new Response(JSON.stringify({ error: 'Username and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const adminData = { ...data, password: hashedPassword };

    // Insert the admin data into the collection
    const result = await collection.insertOne(adminData);
    return new Response(JSON.stringify({ result: "OK", insertedId: result.insertedId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return new Response(JSON.stringify({ error: 'Failed to connect to the database' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await client.close();
  }
}
