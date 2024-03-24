import "./successMessage.css";

import { useLocation, useNavigate } from "react-router-dom";
import MainButton from "../buttons/mainButton";
import { FormEvent } from "react";

interface SetExamPageSuccessMessageProps {
  successMessage: string;
  successMessageText: string;
}
function SuccessMessage({
  successMessage,
  successMessageText,
}: SetExamPageSuccessMessageProps) {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const redirectURL = path.includes("lecturers")
    ? "/lecturers/dashboard"
    : "/students/dashboard";
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(redirectURL);
  };
  return (
    <div className="success-modal-wrapper">
      <div className="success-modal-inner-pop-up">
        <form onSubmit={handleSubmit}>
          <i className="fa-solid fa-check success-icon"></i>
          <p className="success-message">{successMessage}</p>
          <p className="success-message-text">{successMessageText}</p>
          <MainButton button_text="Done" />
        </form>
      </div>
    </div>
  );
}

export default SuccessMessage;
