import { useContext } from "react";
import { WordContext } from "../context/WordContext";

const Keyboard = () => {
  const {
    setLetter,
    backspace,
    enter,

    canEnter,
  } = useContext(WordContext);

  const getInput = (e: any) => {
    setLetter(e.target.innerText);
  };

  return (
    <div className="app-keyboard content">
      <div className="row">
        <span className="input" onClick={getInput}>
          Q
        </span>
        <span className="input" onClick={getInput}>
          W
        </span>
        <span className="input" onClick={getInput}>
          E
        </span>
        <span className="input" onClick={getInput}>
          R
        </span>
        <span className="input" onClick={getInput}>
          T
        </span>
        <span className="input" onClick={getInput}>
          Y
        </span>
        <span className="input" onClick={getInput}>
          U
        </span>
        <span className="input" onClick={getInput}>
          I
        </span>
        <span className="input" onClick={getInput}>
          O
        </span>
        <span className="input" onClick={getInput}>
          P
        </span>
      </div>
      <div className="row">
        <span className="input" onClick={getInput}>
          A
        </span>
        <span className="input" onClick={getInput}>
          S
        </span>
        <span className="input" onClick={getInput}>
          D
        </span>
        <span className="input" onClick={getInput}>
          F
        </span>
        <span className="input" onClick={getInput}>
          G
        </span>
        <span className="input" onClick={getInput}>
          H
        </span>
        <span className="input" onClick={getInput}>
          J
        </span>
        <span className="input" onClick={getInput}>
          K
        </span>
        <span className="input" onClick={getInput}>
          L
        </span>
        <span className="input" onClick={getInput}>
          Ç
        </span>
        <span className="input space esc" onClick={backspace}>
          <i className="fa-solid fa-delete-left esc"></i>
        </span>
      </div>
      <div className="row">
        <span className="input" onClick={getInput}>
          Z
        </span>
        <span className="input" onClick={getInput}>
          X
        </span>
        <span className="input" onClick={getInput}>
          C
        </span>
        <span className="input" onClick={getInput}>
          V
        </span>
        <span className="input" onClick={getInput}>
          B
        </span>
        <span className="input" onClick={getInput}>
          N
        </span>
        <span className="input" onClick={getInput}>
          M
        </span>
        <button
          disabled={!canEnter}
          className="input space enter"
          onClick={enter}
        >
          ENTER
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
