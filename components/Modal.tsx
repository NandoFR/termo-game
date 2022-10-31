import React from "react";
import { toggleBodyScroll } from "../helpers/toggleBodyScroll";

interface Props {
  children: React.ReactElement;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled?: boolean;
}

const Modal = ({ children, open, setOpen, disabled = false }: Props) => {
  return (
    <div className={open ? "app-modal" : "app-modal close"}>
      <div
        onClick={() => {
          if (disabled) return;
          toggleBodyScroll();
          setOpen(false);
        }}
        className="blackscreen"
      ></div>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
