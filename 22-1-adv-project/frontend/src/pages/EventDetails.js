import { useRouteLoaderData } from "react-router-dom";
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

export default EventDetailsPage;