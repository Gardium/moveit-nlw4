import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ChallengeBox.module.css";
import { CountdownContext } from "./../contexts/CountDownContext";

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(
    ChallengeContext
  );
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengedSucceeded() {
    completeChallenge();
    resetCountdown();
  }
  function handleChallengedFailed() {
    resetChallenge();
    resetCountdown();
  }
  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeBoxActive}>
          <header>Ganhe {activeChallenge.amount}xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg `} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description} </p>
          </main>

          <footer>
            <button
              onClick={handleChallengedFailed}
              type="button"
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button
              onClick={handleChallengedSucceeded}
              type="button"
              className={styles.challengeSuccessButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeBoxNotActive}>
          <strong>
            Finalize um ciclo para receber desafios a serem completados
          </strong>

          <p>
            <img src="icons/level-up.svg" alt="levelup" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
}
