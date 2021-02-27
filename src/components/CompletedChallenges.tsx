import styles from "../styles/components/CompletedChallenges.module.css";
import { useContext } from "react";
import { ChallengeContext } from "./../contexts/ChallengesContext";

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengeContext);
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
