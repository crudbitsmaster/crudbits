import { MongoClient } from 'mongodb';
export const revalidate = 60
export async function GET(req) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    const dbName = 'crudbits';

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('messages');

        // Fetching all data
        const data = await collection.find({}).toArray();

        return new Response(JSON.stringify(data), {
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
