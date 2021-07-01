import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetails from '../../components/meetups/MeetupDetail'

function meetupDetails(props) {
    return <Fragment>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content="meetup data" />
        </Head>
        <MeetupDetails
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    </Fragment>
}

export async function getStaticPaths() {

    const MongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    const client = await MongoClient.connect('mongodb+srv://hiren:hiren123@cluster0.loy2s.mongodb.net/test', MongoOptions)

    const db = client.db()

    const meetupsCollection = await db.collection('meetups')

    const result = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: true,
        paths: result.map((meetup) => ({
            params: { meetupId: meetup._id.toString() }
        }))
        // paths: [
        //     {
        //         params: {
        //             meetupId: 'm1'
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: 'm2'
        //         }
        //     }
        // ]
    }
}


export async function getStaticProps(context) {
    const meetupId = context.params.meetupId

    const MongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };


    const client = await MongoClient.connect('mongodb+srv://hiren:hiren123@cluster0.loy2s.mongodb.net/test', MongoOptions)
    const db = client.db()

    const meetupsCollection = await db.collection('meetups')

    const result = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

    client.close();

    return {
        props: {
            meetupData: {
                id: result._id.toString(),
                image: result.image,
                title: result.title,
                address: result.address,
                description: result.description
            }
        }
    }
}

export default meetupDetails;