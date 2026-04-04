import { useEffect, useRef } from "react";
import { useAuth } from "../context/useAuth";
import { saveScore } from "../utils/firestore";

/**
 * Automatically saves the score to Firestore when the game ends,
 * but only if the user is signed in.
 *
 * @param {{ isOver: boolean, score: number, total: number, game: string, duration: number|null }} params
 */
export function useScoreSaver({ isOver, score, total, game, duration }) {
  const { user } = useAuth();
  const saved = useRef(false);

  const isFinished = isOver || (total > 0 && score === total);

  useEffect(() => {
    if (!isFinished || saved.current || !user) return;
    saved.current = true;
    saveScore({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      game,
      score,
      total,
      duration,
    }).catch(console.error);
  }, [isFinished, user, score, total, game, duration]);
}
