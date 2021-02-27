import { useContext } from "react";
import styles from "../styles/components/Profile.module.css";
import { ChallengeContext } from "./../contexts/ChallengesContext";

export function Profile() {
  const { level } = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/gardium.png" alt="Edgard Araujo" />
      <div>
        <strong>Edgard Araujo</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level {level}{" "}
        </p>
      </div>
    </div>
  );
}
