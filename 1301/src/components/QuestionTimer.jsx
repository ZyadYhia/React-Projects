import { useState, useEffect } from "react";
export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => clearTimeout(timer);
  }, [onTimeout, timeout]);
  useEffect(() => {
    const tervalId = setInterval(
      () => setRemainingTime((prevTime) => prevTime - 100),
      100
    );
    return () => clearInterval(tervalId);
  }, []);

  return (
    <div id="timer">
      <progress id="question-time" max={timeout} value={remainingTime} className={mode}/>
    </div>
  );
}
