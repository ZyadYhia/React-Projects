import { useEffect, useState } from "react";
export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);
  useEffect(() => {
    const intervalId = setInterval(() => {
        console.log('interval');
        
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);
    return () => {
      clearInterval(intervalId);
    };
  });
  return <progress value={remainingTime} max={timer} />;
}
