import Header from "../components/Header";
import Display from "../components/Display";
import Keyboard from "../components/Keyboard";
import { useContext, useEffect } from "react";
import { WordContext } from "../context/WordContext";

const Game = () => {
  const { word } = useContext(WordContext);

  useEffect(() => {
    if (!word) window.location.href = "/";
  }, []);
  return (
    <>
      <Header />
      <Display />
      <Keyboard />
    </>
  );
};

export default Game;
