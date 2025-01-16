import { useEffect } from "react";
import ProgressBar from "./ProgressBar";
const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // this clean up function will be called when the component is unmounted
    // will be called before the new useEffect is called again or when the component is removed
    return () => {
      clearTimeout(timerId);
    };
    // when adding function as dependency there is a danger of making infinite loops
    // because functions in JS is object value and may differ in each render cycle
    // and every variable inside the function will be recreated in each render cycle
    // solution is to add useCallback in the onConfirm function in App.jsx
  }, [onConfirm]);
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
