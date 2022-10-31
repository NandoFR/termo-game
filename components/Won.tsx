import Modal from "./Modal";
import { useContext } from "react";
import { WordContext } from "../context/WordContext";
import Link from "next/link";

const Won = ({ open, setOpen }: any) => {
  const { word, lose, reset } = useContext(WordContext);
  return (
    <Modal open={open} setOpen={setOpen} disabled={true}>
      <div className={lose ? "app-won lose" : "app-won"}>
        <h2>{lose ? "Você Perdeu :(" : "Você Ganhou!"}</h2>
        <p>
          A palavra era <b>{word}!</b>
        </p>
        <Link onClick={reset} href="/">
          <button>Jogar Novamente</button>
        </Link>
      </div>
    </Modal>
  );
};

export default Won;
