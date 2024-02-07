import "./successMessage.css";
import SideBar from "../sidebar/sideBar";
import { Link } from "react-router-dom";
import MainButton from "../buttons/mainButton";
import { FormEvent } from "react";

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
  return (
    <div className="set-exams-page-whole-container">
      {/* Sidebar */}
      <SideBar>
        {{
          sidebarElement: (
            <>
              <div className="feature-2">
                <img
                  className="img-feat"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-menu.svg"
                />
                <Link to="/lecturers/dashboard" className="text-wrapper-6">
                  Dashboard
                </Link>
              </div>

              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                />

                <Link
                  to="/lecturers/dashboard/set-exams"
                  className="text-wrapper-6"
                >
                  Set Exams
                </Link>
              </div>
              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                />
                <Link
                  to="/lecturers/dashboard/grade-exams"
                  className="text-wrapper-6"
                >
                  Grade Exams
                </Link>
              </div>
              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-refresh-square-2.svg"
                />
                <Link
                  to="/lecturers/dashboard/results"
                  className="text-wrapper-6"
                >
                  Results
                </Link>
              </div>
            </>
          ),
        }}
      </SideBar>

      {/* Main content */}
      <main className="set-exams-page-main-section">
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
