import QuizCompleted from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );
  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / QUESTIONS.length) * 100
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length / QUESTIONS.length) * 100
  );
  return (
    <div id="summary">
      <h2>Quiz is over!</h2>
      <img src={QuizCompleted} alt="Quiz-Completed" />
      <div id="summary-stats">
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">Answerd Correctly</span>
        </p>
        <p>
          <span className="number">
            {100 - (correctAnswersShare + skippedAnswersShare)}%
          </span>
          <span className="text">Answered Incorrectly</span>
        </p>
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
