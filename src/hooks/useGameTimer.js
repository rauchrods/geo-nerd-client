import { useState, useEffect, useCallback } from "react";

export function useGameTimer(duration) {
  // duration: number of seconds
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!duration) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [duration]);

  const addTime = useCallback((seconds) => {
    setTimeLeft((prev) => (prev > 0 ? prev + seconds : prev));
  }, []);

  const isOver = timeLeft === 0;
  const formatted = timeLeft !== null
    ? `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`
    : null;

  return { timeLeft, isOver, formatted, addTime };
}
