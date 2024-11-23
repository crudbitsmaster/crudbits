import { MongoClient } from 'mongodb';
export const revalidate = 60
export async function POST(req) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    const dbName = 'crudbits';

    try {
        // Check if the secret key is present and valid
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
        const collection = db.collection('products');
        let result;

        // Insert data into the collection
        if (Array.isArray(data)) {
            result = await collection.insertMany(data);
            return new Response(JSON.stringify({ result: "OK", insertedCount: result.insertedCount }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            result = await collection.insertOne(data);
            return new Response(JSON.stringify({ result: "OK", insertedId: result.insertedId }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
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
