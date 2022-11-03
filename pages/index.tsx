import React from "react";
import Link from "next/link";
const Selecionar = () => {
  const [selectedLetter, setSelectedLetter] = React.useState("5");
  const [selectedAttempt, setSelectedAttempt] = React.useState("5");
  const [loading, setLoading] = React.useState(false);
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

      <Link
        onClick={() => setLoading(true)}
        href={`/jogo?letter=${selectedLetter}&attempt=${selectedAttempt}`}
      >
        {loading ? (
          <button disabled={loading} className="play">
            Carregando
            <i className="fa-solid fa-spinner"></i>
          </button>
        ) : (
          <button className="play">Jogar</button>
        )}
      </Link>
    </div>
  );
};

export default Selecionar;
