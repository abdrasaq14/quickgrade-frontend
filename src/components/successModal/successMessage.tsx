import "./successMessage.css";

import { useLocation } from "react-router-dom";
import MainButton from "../buttons/mainButton";
import { FormEvent } from "react";
import LecturerSideBar from "../../pages/lecturers/lecturerSideBar/lecturerSideBar";
import StudentSideBar from "../../pages/students/studentsSideBar/studentsSideBar";

interface SetExamPageSuccessMessageProps {
  successMessage: string;
  successMessageText: string;
  onsubmit: (e: FormEvent) => void;
}
function SuccessMessage({
  successMessage,
  successMessageText,
  onsubmit,
}: SetExamPageSuccessMessageProps) {
  const location = useLocation();
  return (
    <div className="set-exams-page-whole-container">
      {/* Sidebar */}
      {location.pathname.startsWith("/lecturers") ? (
        <LecturerSideBar />
      ) : (
        <StudentSideBar />
      )}

      {/* Main content */}
      <main className="success-modal-main-wrapper">
        {/* set exams heading wrapper */}

        <div className="add-section-pop-up">
          <div className="inner-pop-up">
            <form onSubmit={onsubmit}>
              <i className="fa-solid fa-check success-icon"></i>
              <p className="success-message">{successMessage}</p>
              <p className="success-message-text">{successMessageText}</p>
              <MainButton button_text="Done" />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SuccessMessage;
