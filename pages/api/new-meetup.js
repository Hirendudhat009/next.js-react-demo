import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body

        const { title, image, address, description } = data
        const client = await MongoClient.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false')
        const db = client.db()

        const meetupsCollection = await db.collection('meetups')

        const result = await meetupsCollection.insertOne(data)

        console.log(result);

        client.close()

        res.status(200).send({ message: 'inserted successfully' })

    }
}

export default handler;