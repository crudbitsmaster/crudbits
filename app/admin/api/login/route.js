import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
export const revalidate = 60
export async function POST(req) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  const dbName = 'crudbits';

  try {
    // Connect to the MongoDB client
    await client.connect();
    const data = await req.json();
    const db = client.db(dbName);
    const collection = db.collection('admin');

    // Validate input
    if (!data.username || !data.password) {
      return new Response(JSON.stringify({ error: 'Username and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Find the admin user by username
    const user = await collection.findOne({ username: data.username });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid username or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify the password
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Invalid username or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Successful login (you can also set a session or token here)
    return new Response(JSON.stringify({ result: "OK", userId: user._id }), {
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
