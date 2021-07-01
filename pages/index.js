import MeetupList from '../components/meetups/MeetupList'
import Head from "next/head";
import { Fragment } from "react";
import { MongoClient } from "mongodb";

const DUMMY_DATA = [
    {
        id: 'm1',
        title: 'My First Meetup',
        address: 'surat',
        image: 'https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png'
    },
    {
        id: 'm2',
        title: 'My Second Meetup',
        address: 'surat',
        image: 'https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png'
    }
]

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetup</title>
                <meta name="description" content="meetup data" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res

//     return {
//         props: {
//             meetups: DUMMY_DATA
//         }
//     }
// }


export async function getStaticProps() {

    const MongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };


    const client = await MongoClient.connect('mongodb+srv://hiren:hiren123@cluster0.loy2s.mongodb.net/test', MongoOptions)
    const db = client.db()

    const meetupsCollection = await db.collection('meetups')

    const result = await meetupsCollection.find().toArray()

    return {
        props: {
            meetups: result.map(result => ({
                title: result.title,
                image: result.image,
                description: result.description,
                address: result.address,
                id: result._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default HomePage