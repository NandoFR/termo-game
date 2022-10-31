import Help from "./Help";
import { toggleBodyScroll } from "../helpers/toggleBodyScroll";
import { useState, useContext } from "react";
import { WordContext } from "../context/WordContext";
import Link from "next/link";

const Header = () => {
  const [isHelpOpen, setHelpOpen] = useState(false);
  const { reset } = useContext(WordContext);

  return (
    <>
      <Help open={isHelpOpen} setOpen={setHelpOpen} />
      <div className="app-header content">
        <button
          onClick={() => {
            setHelpOpen(!isHelpOpen);
            toggleBodyScroll();
          }}
          className="icon"
        >
          <i className="fa-solid fa-question"></i>
        </button>
        <h1>Termo</h1>
        <Link onClick={reset} href="/">
          <button className="icon">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Header;
