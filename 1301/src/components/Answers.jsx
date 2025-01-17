import { useRef } from "react";
export default function Answers({
  answers,
  selectedAnswers,
  answerState,
  onSelect,
}) {
  // useRef is used also for managing state of value that doesn't be changed
  // if the function reexecuted again
  const shuffledAnswers = useRef();
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer, index) => {
        const isSelected = selectedAnswers === answer;
        let cssClasses = "";
        if (answerState === "answered" && isSelected) {
          cssClasses = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClasses = answerState;
        }
        return (
          <li key={index} className="answer">
            <button
              disabled={answerState !== ""}
              className={cssClasses}
              onClick={() => onSelect(answer)}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
