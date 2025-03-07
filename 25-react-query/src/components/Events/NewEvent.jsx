import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { createNewEvent, queryClient } from "../../utils/http.js";

export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["events"]});
      navigate("../");
    },

  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending ? (
          "Sending Request..."
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="An error occurred"
          message={error.info?.message || "Failed to create event"}
        />
      )}
    </Modal>
  );
}
