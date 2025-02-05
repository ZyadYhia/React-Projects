import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
    // const fetchedEvents = useLoaderData();
    // const { events: fetchedEvents } = useLoaderData();
    const { events } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {fetchedEvents => <EventsList events={fetchedEvents} />}
            </Await>
        </Suspense>
    );
}

async function fetchEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Failed to fetch events" }), {
            status: 500,
        });
    } else {
        // return response;
        const resData = await response.json();
        return resData.events
    }
}

export const loader = () => {
    return {
        events: fetchEvents(),
    }
}

// export const loader = async () => {

//     const response = await fetch('http://localhost:8080/events');

//     if (!response.ok) {
//         // return { isError: true, message: "Failed to fetch events" };
//         // here React will throw the closest error element
//         // throw { message: "Failed to fetch events" };
//         throw new Response(JSON.stringify({ message: "Failed to fetch events" }), {
//             status: 500,
//         });
//     } else {
//         // const resData = await response.json();
//         // return resData.events
//         return response;
//     }
// }
export default EventsPage;