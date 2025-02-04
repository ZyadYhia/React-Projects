import { useParams } from "react-router-dom";
import EventItem from "../components/EventItem";
const EVENTS = [
    {
        id: 'e1',
        title: 'Programming for everyone',
        description:
            'Ever wanted to learn programming? Here is your chance!',
        location: 'Somestreet 25, 12345 San Somewhereo',
        image: 'https://jooinn.com/images600_/coding-and-programming-computer-science-and-it.jpg'
    },
    {
        id: 'e2',
        title: 'Networking for introverts',
        description:
            'You probably need no help with networking in general...',
        location: 'Meetup Street 10, 12345 Meetup City',
        image: 'https://www.arabianbusiness.com/cloud/2021/11/13/GyawRMqE-arabbusinesspeople_1-1200x750.jpg'
    },
    {
        id: 'e3',
        title: 'Networking for introverts',
        description:
            'You probably need no help with networking in general...',
        location: 'Meetup Street 10, 12345 Meetup City',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDun7QdhL3CCDZuzb-Pm-3FiaENp_eR7MZjQ&s'
    },
]
function EventDetailsPage() {
    const params = useParams();
    const { id } = params;
    const event = EVENTS.find((event) => event.id === id);
    return (
        <>
            <EventItem event={event} />
        </>
    );
}
export default EventDetailsPage;