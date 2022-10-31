import { WordContext } from "../context/WordContext";
import { useContext } from "react";
import Won from "./Won";
const Display = () => {
  const { maxAttempt, maxLetters, wonOpen, setWonOpen } =
    useContext(WordContext);

  return (
    <>
      <Won open={wonOpen} setOpen={setWonOpen} />
      <div className="app-display content">
        {/*@ts-ignore*/}
        {[...Array(Number(maxAttempt)).keys()].map((_, key) => {
          return (
            <div
              key={key}
              data-id={"phrase-" + key}
              className={`phrase max-${maxLetters}`}
            >
              {/*@ts-ignore*/}
              {[...Array(maxLetters).keys()].map((_, key) => {
                return (
                  <span
                    key={key}
                    data-id={"word-" + key}
                    className="word"
                  ></span>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Display;
