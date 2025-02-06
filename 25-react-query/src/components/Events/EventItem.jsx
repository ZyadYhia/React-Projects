import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { fetchEvent } from "../../utils/http.js";
// import { useParams } from "react-router-dom";

export default function EventItem({ event }) {
  // const { data, isPending, isError, error } = useQuery({
  //   queryKey: ["event", event.id],
  //   queryFn: (signal) => {
  //     fetchEvent({id: event.id, signal});
  //   },
  // });
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <article className="event-item">
      <img src={`http://localhost:3000/${event.image}`} alt={event.title} />
      <div className="event-item-content">
        <div>
          <h2>{event.title}</h2>
          <p className="event-item-date">{formattedDate}</p>
          <p className="event-item-location">{event.location}</p>
        </div>
        <p>
          <Link to={`/events/${event.id}`} className="button">
            View Details
          </Link>
        </p>
      </div>
    </article>
  );
}
