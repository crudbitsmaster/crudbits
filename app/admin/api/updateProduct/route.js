import { MongoClient, ObjectId } from 'mongodb';
export const revalidate = 60
export async function PATCH(req) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    const dbName = 'crudbits';

    try {
        // Check if the request header contains the correct secret key
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

        // Ensure that an ID is provided
        if (!data._id) {
            return new Response(JSON.stringify({ error: 'No ID provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate the ObjectId
        let objectId;
        try {
            objectId = new ObjectId(data._id);
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Invalid ID format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Prepare the update operation
        const { _id, ...updateData } = data; // Destructure to remove _id

        // Check if there's any data to update
        if (Object.keys(updateData).length === 0) {
            return new Response(JSON.stringify({ error: 'No data to update' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Attempt to update the document
        const result = await collection.updateOne({ _id: objectId }, { $set: updateData });

        if (result.modifiedCount === 0) {
            return new Response(JSON.stringify({ error: 'No product found with the given ID or no changes made' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ result: "OK", updatedId: data._id }), {
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
