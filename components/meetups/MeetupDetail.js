import { Fragment } from "react";

function MeetupDetails(props) {
    return <Fragment>
        <img
            src={props.image}
            alt={props.alt} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
    </Fragment>
}

export default MeetupDetails;