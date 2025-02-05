import { useRouteLoaderData, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailsPage() {
    const data = useRouteLoaderData('event-details');
    
    return (
        <EventItem event={data.event} />
    );
}


export const loader = async ({ request, params }) => {

    const response = await fetch(`http://localhost:8080/events/${params.id}`);

    if (!response.ok) {
        throw new Error(JSON.stringify({ message: `Failed to fetch event ${params.id}` }), {
            status: 500,
        });
    } else {
        return response;
    }
}
export async function action({request, params}) {
    const response = await fetch(`http://localhost:8080/events/${params.id}`, {
        method: request.method
    })
    if (!response.ok) {
        throw new Error(JSON.stringify({ message: "Failed to delete event" }), {
            status: 500
        })
    }
    return redirect('/events')
}
export default EventDetailsPage;