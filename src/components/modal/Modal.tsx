import { ReactNode } from "react";
import "./ModalStyle.css";
interface ModalProps {
  children: {
    childElement: ReactNode;
  };
}

function Modal({ children }: ModalProps) {
  const { childElement } = children;
  return (
    <div className="add-section-pop-up">
      <div className="set-exams-inner-pop-up">{childElement}</div>
    </div>
  );
}

export default Modal;
