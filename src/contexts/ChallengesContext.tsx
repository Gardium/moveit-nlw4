import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";

interface challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  challengesCompleted: number;
  currentExperience: number;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  activeChallenge: challenge;
  closeLevelUpModal: () => void;
}
interface ChallengeProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengeProvider({
  children,
  ...rest
}: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);
  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("challengesCompleted", String(challengesCompleted));
    Cookies.set("currentExperience", String(currentExperience));
  }, [level, challengesCompleted, currentExperience]);

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
    }

    levelUp();

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }
  function resetChallenge() {
    setActiveChallenge(null);
  }
  function levelUp() {
    setLevel(level + 1);
    setisLevelUpModalOpen(true);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);

    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio🎉", {
        body: `Valendo ${challenge.amount} xp`,
      });
    }
  }

  function closeLevelUpModal() {
    setisLevelUpModalOpen(false);
  }
  return (
    <ChallengeContext.Provider
      value={{
        level,
        challengesCompleted,
        currentExperience,
        experienceToNextLevel,
        levelUp,
        resetChallenge,
        completeChallenge,
        startNewChallenge,
        activeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal></LevelUpModal>}
    </ChallengeContext.Provider>
  );
}
