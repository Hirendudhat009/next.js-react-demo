import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body

        const { title, image, address, description } = data
        const client = await MongoClient.connect('mongodb+srv://hiren:hiren123@cluster0.loy2s.mongodb.net/test')
        const db = client.db()

        const meetupsCollection = await db.collection('meetups')

        const result = await meetupsCollection.insertOne(data)

        console.log(result);

        client.close()

        res.status(200).send({ message: 'inserted successfully' })

    }
}

export default handler;