import Header from "../components/Header";
import Display from "../components/Display";
import Keyboard from "../components/Keyboard";
import { useContext, useEffect } from "react";
import { WordContext } from "../context/WordContext";
import { GetServerSideProps } from "next";
import { randomInt } from "crypto";
import { Word } from "../database/Word";
import mongoose from "mongoose";

interface IGame {
  word: String;
  letter: String;
  attempt: String;
}

const Game = ({ word, letter, attempt }: IGame) => {
  const { setWord, setMaxLetters, setMaxAttempt } = useContext(WordContext);
  useEffect(() => {
    setWord(word);
    setMaxLetters(Number(letter));
    setMaxAttempt(Number(attempt));
  }, []);

  return (
    <>
      <Header />
      <Display />
      <Keyboard />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  await mongoose.connect(process.env.DATABASE_URL!);

  const { letter, attempt } = context.query;
  if (!letter || !attempt) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const word = await Word.find().where("length").equals(letter);
  const key = randomInt(word.length);

  if (!word) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  await mongoose.disconnect();
  return {
    props: {
      word: word[key].name,
      attempt,
      letter,
    }, // will be passed to the page component as props
  };
};
export default Game;
