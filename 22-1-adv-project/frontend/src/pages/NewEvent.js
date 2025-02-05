import { redirect } from 'react-router-dom';
import EventForm from '../components/EventForm';
function NewEventPage() {
    return (
        <EventForm method={'POST'} />
    );
}


export async function action({request, params}) {
    const data = await request.formData();
    const eventDate = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description')
    }    
    const response = await fetch('http://localhost:8080/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventDate)
    })
    if (response.status === 422) {
        return response
    }
    if (!response.ok) {
        throw new Error(JSON.stringify({ message: "Failed to add event" }), {
            status: 500
        })
    }
    return redirect('/events')
}

export default NewEventPage;