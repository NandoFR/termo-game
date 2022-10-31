import Modal from "./Modal";
import { useContext } from "react";
import { WordContext } from "../context/WordContext";
const Help = ({ open, setOpen }: any) => {
  const { maxAttempt } = useContext(WordContext);

  return (
    <Modal open={open} setOpen={setOpen}>
      <>
        <div className="app-help">
          <p>
            Descubra a palavra certa em {maxAttempt} tentativas. Depois de cada
            tentativa, as peças monstram o quão perto você está da solução.
          </p>
          <div className="phrase">
            <span className="word success">T</span>
            <span className="word">U</span>
            <span className="word">R</span>
            <span className="word">M</span>
            <span className="word">A</span>
          </div>
          <p>
            A letra<span className="word success">T</span> faz parte da palavra
            e está na posição correta.
          </p>
          <div className="phrase">
            <span className="word">V</span>
            <span className="word">I</span>
            <span className="word">R</span>
            <span className="word alert">O</span>
            <span className="word">L</span>
            <span className="word">A</span>
          </div>
          <p>
            A letra <span className="word alert">O</span> faz parte da mas em
            outra posição.
          </p>
          <div className="phrase">
            <span className="word">P</span>
            <span className="word">U</span>
            <span className="word">L</span>
            <span className="word error">G</span>
            <span className="word">A</span>
          </div>
          <p>
            A letra <span className="word error">O</span> não faz parte da
            palavra.
          </p>
          <p>
            Os acentos são preenchidos automaticamente, e não são considerados
            nas dicas.
          </p>
          <p>As palavras podem pussir letras repetidas.</p>
        </div>
      </>
    </Modal>
  );
};

export default Help;
