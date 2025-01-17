import QUESTIONS from "../questions.js";
import { useState, useCallback } from "react";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsOver = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  },
  []);

  const handleSkippedAnswers = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  if (quizIsOver) {
    return <Summary userAnswers={userAnswers}/>;
  }
  return (
    <div id="quiz">
      <Question
        // the key is used in react to identify the component
        // and also is used to detect if another elements changes and re-render the component
        // even if the component is not changing
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onsSkipAnswer={handleSkippedAnswers}
      />
    </div>
  );
}
