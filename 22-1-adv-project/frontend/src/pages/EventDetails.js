import { Suspense } from "react";
import { useRouteLoaderData, redirect, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

function EventDetailsPage() {
    const { event, events } = useRouteLoaderData('event-details');
    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={event}>
                    {loadedEvent => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>

            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {loadedEvents => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    );
}

const fetchEvent = async (params) => {
    const response = await fetch(`http://localhost:8080/events/${params.id}`);

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: `Failed to fetch event ${params.id}` }), {
            status: 500,
        });
    } else {
        // return response;
        const resData = await response.json();
        return resData.event
    }
}
const fetchEvents = async () => {
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

export const loader = async ({ request, params }) => {
    return {
        // await here will force react to not render the page until the promise is resolved
        // and the another defer will be loaded after the page is rendered
        event: await fetchEvent(params),
        events: fetchEvents()
    }
}
export async function action({ request, params }) {
    const response = await fetch(`http://localhost:8080/events/${params.id}`, {
        method: request.method
    })
    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Failed to delete event" }), {
            status: 500
        })
    }
    return redirect('/events')
}
export default EventDetailsPage;