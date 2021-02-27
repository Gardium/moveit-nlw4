import Head from "next/head";
import { GetServerSideProps } from "next";
import styles from "../styles/pages/Home.module.css";

import { ExperienceBar } from "./../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "./../components/Couintdown";
import { ChallengeBox } from "./../components/ChallengeBox";
import { CountdownProvider } from "./../contexts/CountDownContext";
import { ChallengeProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  CompletedChallenges: number;
}
export default function Home(props) {
  return (
    <ChallengeProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>

        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
