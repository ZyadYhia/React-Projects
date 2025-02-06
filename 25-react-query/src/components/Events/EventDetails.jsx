import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "../Header.jsx";
import { fetchEvent, deleteEvent, queryClient } from "../../utils/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const [isDeletingModal, setIsDeletingModal] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["event", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  const {
    mutate,
    isPending: isDeleting,
    isError: isDeletingError,
    error: deletingError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        // refetchType is used to prevent the query from being refetched now
        // but waits for the next time the query is called to refetch
        refetchType: "none",
      });
      navigate("../");
    },
  });

  const startDeleteHandler = () => {
    setIsDeletingModal(true);
  };
  const endDeletingHandler = () => {
    setIsDeletingModal(false);
  };
  const handleDelete = () => {
    mutate({ id });
  };

  let content;
  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching Event: {id} Data...</p>
        <LoadingIndicator />
      </div>
    );
  }
  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="An error occurred"
          message={
            error.info?.message ||
            "Failed to fetch event. please try again later."
          }
        />
      </div>
    );
  }
  if (data) {
    const formattedDate = new Date(data?.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const [hours, minutes] = data.time.split(":");
    const date = new Date();
    date.setHours(hours, minutes, 0);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    content = (
      <>
        {isDeletingModal && (
          <Modal>
            <h2>Are you sure?</h2>
            <p>Do you want to delete this event?</p>
            {isDeleting && <p className="center">Deleting event...</p>}
            {!isDeleting && (
              <div className="form-actions">
                <button className="button-text" onClick={endDeletingHandler}>
                  Cancel
                </button>
                <button className="button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
            {isDeletingError && (
              <ErrorBlock
                title="An error occurred"
                message={
                  deletingError.info?.message ||
                  "Failed to delete event. Please try again later."
                }
              />
            )}
          </Modal>
        )}
        <header>
          <h1>{data?.title}</h1>
          <nav>
            <button disabled={isDeleting} onClick={startDeleteHandler}>
              Delete
            </button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.image} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {formattedTime}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
