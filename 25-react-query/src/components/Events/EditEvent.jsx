import {
  Link,
  useNavigate,
  useParams,
  redirect,
  useSubmit,
  useNavigation,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent, queryClient } from "../../utils/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const { id } = useParams();
  const submit = useSubmit();
  const { state } = useNavigation();
  const {
    data: dataFetched,
    isError: fetchingIsError,
    error: fetchingError,
  } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
    staleTime: 1000 * 10,
  });

  const navigate = useNavigate();

  function handleSubmit(formData) {
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

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
        {state === "submitting" ? (
          <div className="center">Sending Data...</div>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }
  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  const { id } = params;
  return queryClient.fetchQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });
}

export async function action({ request, params }) {
  const { id } = params;
  const formData = await request.formData();
  const updatedData = Object.fromEntries(formData);
  await updateEvent({ id, event: updatedData });
  await queryClient.invalidateQueries(["events"]);
  return redirect(`../`);
}
