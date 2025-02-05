import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
    // const fetchedEvents = useLoaderData();
    // const { events: fetchedEvents } = useLoaderData();
    const data = useLoaderData();
    // if (data.isError) {
    //     return <p>{data.message}</p>;
    // }
    const fetchedEvents = data.events;
    return (
        <>
            <EventsList events={fetchedEvents} />
        </>
    );
}
export const loader = async () => {

    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return { isError: true, message: "Failed to fetch events" };
        // here React will throw the closest error element
        // throw { message: "Failed to fetch events" };
        throw new Error(JSON.stringify({ message: "Failed to fetch events" }), {
            status: 500,
        });
    } else {
        // const resData = await response.json();
        // return resData.events
        return response;
    }
}
export default EventsPage;