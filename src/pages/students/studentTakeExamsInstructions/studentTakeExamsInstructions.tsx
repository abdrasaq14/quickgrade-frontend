import SideBar from "../../../components/sidebar/sideBar";
import MainButton from "../../../components/buttons/mainButton";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./studentTakeExamsInstructions.css";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import Header from "../../../components/header/header";

function StudentTakeExamsInstructions() {
  const studentData = useAuth();
  const { courseCode } = useParams();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/students/dashboard/take-exams/${courseCode}`);
  };

  return (
    <>
      <div className="take-exams-instructions-wrapper">
        <SideBar>
          {{
            sidebarElement: (
              <>
                <div className="feature-2">
                  <img
                    className="img-feat"
                    src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-menu.svg"
                  />
                  <Link to="/students/dashboard" className="text-wrapper-6">
                    Dashboard
                  </Link>
                </div>
                <div className="feature-2">
                  <img
                    className="img-2"
                    src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-book-square.svg"
                  />
                  <Link
                    to="/students/dashboard/enrolled-courses"
                    className="text-wrapper-6"
                  >
                    Enrolled Courses
                  </Link>
                </div>
                <div className="feature-2">
                  <img
                    className="img-2"
                    src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                  />
                  <Link
                    to="/students/dashboard/results"
                    className="text-wrapper-6"
                  >
                    Results
                  </Link>
                </div>
              </>
            ),
          }}
        </SideBar>
        <div className="exam-instructions-container">
          <Header newUser={studentData?.studentData?.firstName || ""} />
          <div className="exam-instructions-body">
            <section className="exam-instructions-body-section1">
              <div className="exam-instructions-body-title">Take Exams</div>
              <div className="exam-instructions-timer">
                <div className="exam-instructions-timer-minutes">
                  <div>120</div>
                  <div>Minutes</div>
                </div>
                <div className="exam-instructions-timer-divider">:</div>
                <div className="exam-instructions-timer-seconds">
                  <div>00</div>
                  <div>Seconds</div>
                </div>
              </div>
            </section>
            <section className="exam-instructions-body-section2">
              <form
                onSubmit={handleSubmit}
                className="exam-instructions-body-wrapper"
              >
                <div>Read Carefully</div>
                <div>
                  <ul>
                    <li>
                      Camera is turned on from examination start to finish.
                    </li>
                    <li>
                      Examination is timed and countdown begins once the start
                      button is clicked.
                    </li>
                    <li>
                      When the submit button is clicked, answers will be
                      submitted and you will be logged out of the examination.
                    </li>
                    <li>
                      Once the assigned examination time ends, you will be
                      logged out of the exam and your answers will be
                      automatically submitted.
                    </li>
                    <li>Read examination instructions carefully.</li>
                  </ul>
                </div>
                <div className="exam-instructions-body-wrapper-btn">
                  <div>
                    <p>
                      By clicking start, you consent to video recording of you
                      during the duration of the exams.
                    </p>
                  </div>
                  <div>
                    <MainButton button_text={"Start exam"} />
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
export default StudentTakeExamsInstructions;
