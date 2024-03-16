import "./GradeExamTheoryStyle.css";
import Header from "../../components/header/header";
import previousArrow from "../../assets/previous_arrow copy.png";
import LecturerSideBar from "../lecturers/lecturerSideBar/lecturerSideBar";

const GradeExamTheory = () => {
  return (
    <div className="grade-theory-exams-page-whole-container">
      <LecturerSideBar />
      <div className="grade-theory-exams-page-main-section-and-header">
        <Header newUser="Matthew the Traitor" />
        <main className="grade-theory-exams-page-main-section">
          <div className="grade-theory-exams-page-main-section-title-container">
            <h1 className="grade-theory-exams-page-main-section-title">
              Grade Exams/
              <span className="grade-theory-exams-page-main-section-title-course-code">
                CE522/
              </span>{" "}
              <span className="grade-theory-exams-page-main-section-title-student-id">
                20/21/03/051
              </span>{" "}
            </h1>
          </div>

          <div className="grade-theory-exams-page-all-forms">
            <div className="grade-theory-exams-page-top-form">
              <div className="grade-theory-exams-page-session-form-container">
                <form className="grade-theory-exams-page-session-form">
                  <div className="grade-theory-exams-page-session-form-row">
                    <div className="grade-theory-exams-page-form-label-and-inputs">
                      <label
                        className="grade-theory-exams-page-session-form-label"
                        htmlFor="sessionInput"
                      >
                        Session
                      </label>
                      <br />
                      <select
                        className="grade-theory-exams-page-session-form-input"
                        name="session"
                        id="sessionInput"
                        disabled={true}
                      >
                        <option value="Please select">Please Select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>

                    <div className="grade-theory-exams-page-form-label-and-inputs">
                      <label
                        className="grade-theory-exams-page-session-form-label"
                        htmlFor="semesterInput"
                      >
                        Semester
                      </label>
                      <br />
                      <select
                        className="grade-theory-exams-page-session-form-input"
                        name="semester"
                        id="semesterInput"
                        disabled={true}
                      >
                        <option value="">Select</option>
                        <option value="first semester">First</option>
                        <option value="second semester">Second</option>
                      </select>
                    </div>

                    <div className="grade-theory-exams-page-form-label-and-inputs">
                      <label
                        className="grade-theory-exams-page-session-form-label"
                        htmlFor="facultyInput"
                      >
                        Faculty
                      </label>
                      <br />
                      <select
                        className="grade-theory-exams-page-session-form-input"
                        name="semester"
                        id="semesterInput"
                        disabled={true}
                      >
                        <option value="Please select">Please Select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>

                    <div className="grade-theory-exams-page-form-label-and-inputs">
                      <label
                        className="grade-theory-exams-page-session-form-label"
                        htmlFor="departmentInput"
                      >
                        Department
                      </label>
                      <br />
                      <select
                        className="grade-theory-exams-page-session-form-input"
                        name="semester"
                        id="semesterInput"
                        disabled={true}
                      >
                        <option value="Please select">Please Select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>

                  <div className="grade-theory-exams-page-session-form-row">
                    <div className="grade-theory-exams-page-form-label-and-inputs">
                      <label
                        className="grade-theory-exams-page-session-form-label"
                        htmlFor="courseCodeInput"
                      >
                        Course Code
                      </label>
                      <br />
                      <select
                        className="grade-theory-exams-page-session-form-input"
                        name="semester"
                        id="semesterInput"
                        disabled={true}
                      >
                        <option value="Please select">Please Select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>

                    <div className="grade-theory-exams-page-form-label-and-inputs">
                      <label
                        className="grade-theory-exams-page-session-form-label"
                        htmlFor="courseTitleInput"
                      >
                        Course Title
                      </label>
                      <br />
                      <select
                        className="grade-theory-exams-page-session-form-input"
                        name="semester"
                        id="semesterInput"
                        disabled={true}
                      >
                        <option value="Please select">Please Select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>

                    <div className="grade-theory-exams-page-form-label-and-inputs">
                      <label
                        className="grade-theory-exams-page-session-form-label"
                        htmlFor="totalScoreInput"
                      >
                        Total Score
                      </label>
                      <br />
                      <input
                        className="grade-theory-exams-page-session-form-input"
                        placeholder="Type Obtainable Score"
                        type="number"
                        id="totalScoreInput"
                        name="totalScore"
                        disabled={true}
                      />
                    </div>

                    <div className="grade-theory-exams-page-form-label-and-inputs">
                      <label
                        className="grade-theory-exams-page-session-form-label"
                        htmlFor="timeAllowedInput"
                      >
                        Time allowed
                      </label>
                      <br />
                      <input
                        className="grade-theory-exams-page-session-form-input"
                        placeholder="60 mins"
                        type="text"
                        id="timeAllowedInput"
                        name="timeAllowed"
                        disabled={true}
                      />
                    </div>
                  </div>

                  <div className="grade-theory-exams-page-session-form-instruction-row">
                    <label
                      className="grade-theory-exams-page-session-form-label"
                      htmlFor="instructionsInput"
                    >
                      Instructions
                    </label>{" "}
                    <br />
                    <input
                      className="grade-theory-exams-page-session-form-instructions-input"
                      placeholder="Type Instructions"
                      value="Answer All Questions"
                      //Value needs to be dynamic
                      type="text"
                      id="instructionsInput"
                      name="instructions"
                      disabled={true}
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className="grade-theory-exams-page-bottom-form">
              <div className="grade-theory-exams-page-student-id-and-total-score-container">
                <div className="grade-theory-exams-page-student-id">
                  {" "}
                  Student ID: 20/21/03/051
                </div>
                <div className="grade-theory-exams-page-total-score-container">
                  <p className="grade-theory-exams-page-total-score-label">
                    Total Score
                  </p>
                  <p className="grade-theory-exams-page-total-score-value">
                    100
                  </p>
                </div>
              </div>

              <div className="grade-theory-exams-page-questions-section-container">
                <div className="grade-theory-exams-page-questions-section-header-and-marks">
                  <h1 className="grade-theory-exams-page-questions-section-title">
                    Section B{" "}
                    <span className="grade-theory-exams-page-questions-section-header-subtitle">
                      (Fill-in-the-blanks and theory questions)
                    </span>
                  </h1>
                  <hr />
                  <p className="grade-theory-exams-page-questions-section-title-marks">
                    [30] Marks
                  </p>
                </div>
                <div className="grade-theory-exams-page-questions-section-score">
                  <p className="grade-theory-exams-page-questions-section-score-title">
                    Section Score
                  </p>
                  <p className="grade-theory-exams-page-questions-section-score-value">
                    25
                  </p>
                </div>
              </div>

              <div className="grade-theory-exams-page-questions-answers-and-marks-container">
                <p className="grade-theory-exams-page-lecturer-question">
                  [1]. Define Chemical Engineering
                </p>
                <div className="grade-theory-exams-page-answers-and-grade-container">
                  <p className="grade-theory-exams-page-student-answer">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <form className="grade-theory-exams-page-lecturer-grade-form">
                    <label
                      className="grade-theory-exams-page-lecturer-grade-label"
                      htmlFor="lectuerGradeInput"
                    >
                      Points
                    </label>{" "}
                    <br />
                    <input
                      className="grade-theory-exams-page-lecturer-grade-input"
                      type="number"
                      id="lectuerGradeInput"
                      name="lectuerGrade"
                      min={0}
                    />
                  </form>
                </div>
              </div>

              <div className="grade-theory-exams-page-bottom-form-base-button-section">
                <button className="grade-theory-exams-page-finish-button">
                  Finish
                </button>

                <div className="grade-theory-exams-page-previous-section-container">
                  <a
                    href="#"
                    className="grade-theory-exams-page-previous-section-link"
                  >
                    <img
                      src={previousArrow}
                      className="set-exams-page-previous-section-arrow"
                    />
                    <span className="grade-theory-exams-page-previous-section-text">
                      Previous Section
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GradeExamTheory;
