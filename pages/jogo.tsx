import Header from "../components/Header";
import Display from "../components/Display";
import Keyboard from "../components/Keyboard";
import { useContext, useEffect } from "react";
import { WordContext } from "../context/WordContext";
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";

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
  console.log(context.query);
  const { letter, attempt } = context.query;
  if (!letter || !attempt) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const prisma = new PrismaClient();
  const word = await prisma.word.findMany({
    where: {
      length: Number(letter),
    },
  });

  if (!word) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const key = randomInt(word.length);

  return {
    props: {
      word: word[key].name,
      attempt,
      letter,
    }, // will be passed to the page component as props
  };
};
export default Game;
