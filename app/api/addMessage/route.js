import { MongoClient } from 'mongodb';
export const revalidate = 60
export async function POST(req) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    const dbName = 'crudbits';

    try {
        await client.connect();
        const data = await req.json();
        const db = client.db(dbName);
        const collection = db.collection('messages');
        let result;

        if (Array.isArray(data)) {
            result = await collection.insertMany(data);
            // Return all inserted IDs for insertMany
            return new Response(JSON.stringify({ result: "OK", insertedIds: result.insertedIds }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            result = await collection.insertOne(data);
            // Return the single inserted ID for insertOne
            return new Response(JSON.stringify({ result: "OK", insertedId: result.insertedId }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        await client.close();
    }
}
