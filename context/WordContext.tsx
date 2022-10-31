import { createContext, useState, ReactElement, useEffect } from "react";
import { useUpdate } from "../hooks/useUpdate";
export const WordContext = createContext<any>({});
export const WordProvider = ({ children }: { children: ReactElement }) => {
  const [maxAttempt, setMaxAttempt] = useState(3);
  const [maxLetters, setMaxLetters] = useState(4);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [letter, setLetter] = useState("");
  const [word, setWord] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [canEnter, setCanEnter] = useState(false);
  const [wonOpen, setWonOpen] = useState(false);
  const [lose, setLose] = useState(false);

  const reset = () => {
    setMaxAttempt(0);
    setMaxLetters(0);
    setCurrentAttempt(0);
    setCurrentLetter(0);
    setLetter("");
    setWord("");
    setCurrentWord("");
    setCanEnter(false);
    setWonOpen(false);
    setLose(false);
  };

  const backspace = () => {
    setCanEnter(false);
    const currentDisplayElement = document.querySelector(
      `.phrase[data-id=phrase-${currentAttempt}] > .word[data-id=word-${currentLetter}]`
    )!;

    const previousDisplayElement = document.querySelector(
      `.phrase[data-id=phrase-${currentAttempt}] > .word[data-id=word-${
        currentLetter - 1
      }]`
    );

    if (
      currentLetter === maxLetters - 1 &&
      currentDisplayElement.innerHTML === ""
    ) {
      currentDisplayElement.classList.remove("current");
    }
    if (previousDisplayElement && currentLetter !== maxLetters - 1) {
      currentDisplayElement.classList.remove("current");

      previousDisplayElement.classList.add("current");
    }

    if (currentDisplayElement?.innerHTML) {
      currentDisplayElement.innerHTML = "";
      return;
    }

    if (previousDisplayElement && previousDisplayElement.innerHTML) {
      previousDisplayElement.innerHTML = "";
      if (currentLetter) {
        setCurrentLetter(currentLetter - 1);
      }
      return;
    }
  };
  const enter = () => {
    if (currentLetter !== maxLetters - 1) return;
    setCanEnter(false);

    const currentDisplayElement = document.querySelector(
      `.phrase[data-id=phrase-${currentAttempt}] > .word[data-id=word-${currentLetter}]`
    )!;
    const allWords = document.querySelectorAll(
      `.phrase[data-id=phrase-${currentAttempt}] > .word`
    );

    let w = "";
    allWords.forEach((e) => {
      w += e.innerHTML;
    });
    setCurrentWord(w);

    currentDisplayElement.classList.remove("current");

    if (currentAttempt !== maxAttempt) {
      setCurrentLetter(0);
      setCurrentAttempt(currentAttempt + 1);
    }
  };

  useEffect(() => {
    const currentDisplayElement = document.querySelector(
      `.phrase[data-id=phrase-${currentAttempt}] > .word[data-id=word-${currentLetter}]`
    )!;

    const previousDisplayElement = document.querySelector(
      `.phrase[data-id=phrase-${currentAttempt}] > .word[data-id=word-${
        currentLetter - 1
      }]`
    )!;

    if (previousDisplayElement) {
      previousDisplayElement.classList.remove("current");
    }

    if (currentDisplayElement) {
      currentDisplayElement.classList.add("current");
    }
  }, [currentLetter]);

  useUpdate(() => {
    if (!letter) return;

    const currentDisplayElement = document.querySelector(
      `.phrase[data-id=phrase-${currentAttempt}] > .word[data-id=word-${currentLetter}]`
    )!;

    if (!currentDisplayElement) return;
    const nextDisplayElement = document.querySelector(
      `.phrase[data-id=phrase-${currentAttempt}] > .word[data-id=word-${
        currentLetter + 1
      }]`
    );
    currentDisplayElement.innerHTML = letter;

    if (nextDisplayElement) {
      setCurrentLetter(currentLetter + 1);
    }

    if (currentLetter === maxLetters - 1 && currentDisplayElement.innerHTML) {
      setCanEnter(true);
    }

    setLetter("");
  }, [letter]);

  useUpdate(() => {
    if (!currentWord) return;

    const correctWord = word.toLowerCase().split("");
    const splitedCurrentWord = currentWord.toLowerCase().split("");

    if (correctWord === splitedCurrentWord) {
      setWonOpen(true);
      return;
    }
    splitedCurrentWord.map((v, k) => {
      let el = document.querySelector(
        `.phrase[data-id=phrase-${
          currentAttempt - 1
        }] > .word[data-id=word-${k}]`
      )!;
      if (!el) return;

      if (correctWord[k] === v) {
        el.classList.add("success");
        return;
      }

      if (correctWord[k] !== v && correctWord.includes(v)) {
        el.classList.add("alert");
        return;
      }

      if (!correctWord.includes(v)) {
        el.classList.add("error");
        return;
      }
    });

    if (word.toLowerCase() === currentWord.toLowerCase()) {
      setWonOpen(true);
      return;
    }

    if (currentAttempt === maxAttempt) {
      setWonOpen(true);
      setLose(true);
      return;
    }

    setCurrentWord("");
  }, [currentWord]);

  return (
    <WordContext.Provider
      value={{
        maxAttempt,
        setMaxAttempt,
        maxLetters,
        setMaxLetters,
        currentAttempt,
        setCurrentAttempt,
        currentLetter,
        setCurrentLetter,
        letter,
        setLetter,
        backspace,
        enter,
        canEnter,
        wonOpen,
        setWonOpen,
        word,
        lose,
        reset,
        setWord,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};
