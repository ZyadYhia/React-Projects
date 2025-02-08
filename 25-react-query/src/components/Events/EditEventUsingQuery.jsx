import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent, queryClient } from "../../utils/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const { id } = useParams();
  const {
    data: dataFetched,
    isPending: fetchingIsPending,
    isError: fetchingIsError,
    error: fetchingError,
  } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });
  
  const { mutate } = useMutation({
    mutationFn: updateEvent,
    // onMutate is holding a function that will be called before the mutation function is executed 
    onMutate: async (data) => {
      const newEvent = data.event;
      // to cancel any current onging queries for the event
      // and avoid conflicting data in the cache
      await queryClient.cancelQueries({ queryKey: ["events", id] });
      const previousEvent = queryClient.getQueryData(["events", id]);
      // the data parameter received is the same object sent in mutate function for execution
      queryClient.setQueryData(["events", id], newEvent);
      // this return is the context will be received in onError function
      return { previousEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", id], context.previousEvent);
    },
    // onSatteled is called after the mutation function is executed
    // whatever it suucceeds or fails
    onSettled: () => {
      queryClient.invalidateQueries(["events", id]);
    },
  });
  const navigate = useNavigate();

  function handleSubmit(formData) {
    mutate({ id, event: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  let content;
  if (fetchingIsPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }
  if (fetchingIsError) {
    content = (
      <div className="center">
        <ErrorBlock
          title="An error occurred"
          message={fetchingError.info?.message}
        />
        <div className="form-actions">
          <Link to="../" className="button-text">
            Okay
          </Link>
        </div>
      </div>
    );
  }
  if (dataFetched) {
    content = (
      <EventForm inputData={dataFetched} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }
  return <Modal onClose={handleClose}>{content}</Modal>;
}
