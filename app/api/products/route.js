import { MongoClient } from 'mongodb';
export const revalidate = 60
export async function GET(req) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    const dbName = 'crudbits';

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('products');

        // Fetching all data
        const data = await collection.find({}).toArray();
        const fdata = data.map((item) => { 
            return {
                ...item,
                slug: item.title.toLowerCase().split(" ").join("-"),
            };
        });
        return new Response(JSON.stringify(fdata), {
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
