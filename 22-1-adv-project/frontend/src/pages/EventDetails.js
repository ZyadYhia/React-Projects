import { Suspense } from "react";
import { useRouteLoaderData, redirect, Await } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailsPage() {
    const { event } = useRouteLoaderData('event-details');
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={event}>
                {data => <EventItem event={data} />}
            </Await>
        </Suspense>
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

export const loader = ({request, params}) => {
    return {
        event: fetchEvent(params),
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