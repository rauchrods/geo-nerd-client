import { useState, useEffect } from "react";

export function useGameTimer(duration) {
  // duration: number of seconds, or null for unlimited
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

  const isOver = timeLeft === 0;
  const formatted = `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`;

  return { timeLeft, isOver, formatted };
}
