import React from "react";
import { WordContext } from "../context/WordContext";
import { useRouter } from "next/router";
const Selecionar = () => {
  const [selectedLetter, setSelectedLetter] = React.useState("5");
  const [selectedAttempt, setSelectedAttempt] = React.useState("5");
  const { setWord, setMaxAttempt, setMaxLetters } =
    React.useContext(WordContext);
  const router = useRouter();

  React.useEffect(() => {
    const allLetters = document.querySelectorAll(
      ".app-form > .group > .letter"
    );

    allLetters.forEach((e: any) => {
      if (e.innerText === selectedLetter) {
        e.classList.add("active");
      }
    });

    const allAttempts = document.querySelectorAll(
      ".app-form > .group > .attempt"
    );

    allAttempts.forEach((e: any) => {
      if (e.innerText === selectedAttempt) {
        e.classList.add("active");
      }
    });
  }, []);

  const handleClick = (e: any) => {
    if (e.target.classList.contains("letter")) {
      const allLetters = document.querySelectorAll(
        ".app-form > .group > .letter"
      );

      allLetters.forEach((e: any) => {
        e.classList.remove("active");
      });

      setSelectedLetter(e.target.innerText);
    }

    if (e.target.classList.contains("attempt")) {
      const allAttempts = document.querySelectorAll(
        ".app-form > .group > .attempt"
      );

      allAttempts.forEach((e: any) => {
        e.classList.remove("active");
      });

      setSelectedAttempt(e.target.innerText);
    }

    e.target.classList.add("active");
  };

  return (
    <div className="app-form content">
      <h1>Configurar Jogo</h1>
      <h2>Caracteres</h2>
      <div className="group">
        <button onClick={handleClick} className="box letter">
          4
        </button>
        <button onClick={handleClick} className="box letter">
          5
        </button>
        <button onClick={handleClick} className="box letter">
          6
        </button>
        <button onClick={handleClick} className="box letter">
          7
        </button>
        <button onClick={handleClick} className="box letter">
          8
        </button>
        <button onClick={handleClick} className="box letter">
          9
        </button>
        <button onClick={handleClick} className="box letter">
          10
        </button>
      </div>
      <h2>Tentativas</h2>
      <div className="group">
        <button onClick={handleClick} className="box attempt">
          3
        </button>
        <button onClick={handleClick} className="box attempt">
          4
        </button>
        <button onClick={handleClick} className="box attempt">
          5
        </button>
        <button onClick={handleClick} className="box attempt">
          6
        </button>
        <button onClick={handleClick} className="box attempt">
          7
        </button>
        <button onClick={handleClick} className="box attempt">
          8
        </button>
        <button onClick={handleClick} className="box attempt">
          9
        </button>
        <button onClick={handleClick} className="box attempt">
          10
        </button>
      </div>

      <button
        onClick={async () => {
          let data = await fetch("/api/getWord", {
            method: "POST",
            body: JSON.stringify({
              length: selectedLetter,
            }),
          });
          if (data.status !== 200) {
            console.log(await data.json());
            console.log("error");
            return;
          }
          data = await data.json();
          //@ts-ignore
          if (data.word) {
            //@ts-ignore
            setWord(data.word.name);
            //@ts-ignore
            setMaxLetters(data.word.length);
            setMaxAttempt(Number(selectedAttempt));
            router.push("/jogo");
          }
        }}
        className="play"
      >
        Jogar
      </button>
    </div>
  );
};

export default Selecionar;
