import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from "next/router";
import { Fragment } from 'react';
import Head from "next/head";

function NewMeetupPage() {
    const router = useRouter()
    async function AddMeetupHandler(data) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })

        const result = await response.json()

        router.push('/')
    }

    return <Fragment>
        <Head>
            <title>Add New MeetUp</title>
            <meta name="description" content="meetup data" />
        </Head>
        <NewMeetupForm onAddMeetup={AddMeetupHandler} />
    </Fragment>
}

export default NewMeetupPage