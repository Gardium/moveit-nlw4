import styles from "../styles/components/LevelUpModal.module.css";
import { ChallengeContext } from "./../contexts/ChallengesContext";
import { useContext } from "react";

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengeContext);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo level</p>
        <button onClick={closeLevelUpModal} type="button">
          <img src="/icons/close.svg" alt="fechar modal" />
        </button>
      </div>
    </div>
  );
}