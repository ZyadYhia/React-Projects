import { useQuery } from '@tanstack/react-query';

import { fetchEvents } from '../../utils/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

export default function NewEventsSection() {
  const { data, isPending, isError, error,  } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    // staleTime is used to set the time in milliseconds that the cache is considered fresh
    // which means that it will not be refetched until the time has passed
    // default is 0
    staleTime: 1000 * 5,
    // gcTime is used to set the time in milliseconds that the cache is considered expires 
    // which means that it will be removed from the cache and needed yo be updated
    // default is 5 minutes
    // gcTime: 1000
  })
  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error?.message}/>
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
