import "./lec_grade.css";
import SideBar from "../../../components/sidebar/sideBar";
import Header from "../../../components/header/header";
import { Link } from "react-router-dom";

function LecturerGrades() {
  return (
    <div className="grades-main-body-wrapper">
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
      <div className="grades-right-body-wrapper">
        <Header newUser="New User" />

        <div className="grades-first">
          <div className="grades-results-info">
            <h3 className="grades-results">
              Grade Exams/ <span className="grades-results-span">CE 522</span>
            </h3>
          </div>

          {/* <div className="session-info">
            <label htmlFor="session">Session :</label>
            <select id="session">
              <option value="2022/2023">2022/2023</option>
              <option value="2023/2024">2023/2024</option>
            </select>
          </div>

          <div className="semester-info">
            <label htmlFor="semester">Semester :</label>
            <select id="semester">
              <option value="grades-first">First</option>
              <option value="second">Second</option>
            </select>
          </div> */}

          <div className="grades-session-info">
            <h3 className="grades-sess-info">
              2022/2023 : Second Semester Examinations
            </h3>
            <h4 className="grades-sess-sub">210 submissions</h4>
          </div>
        </div>

        <div className="grades-grid-container">
          <div className="grades-course-card">
            <div className="grades-middle-card">
              <div className="grades-middle-left">
                <p className="grades-complete">62</p>
                <h4 className="grades-totalscore">Grade Complete</h4>
              </div>
              <div className="grades-middle-right">
                <h5 className="grades-grade-sections">20/21/03/011</h5>
              </div>
            </div>
          </div>

          <div className="grades-course-card">
            <div className="grades-middle-card">
              <div className="grades-middle-left">
                <p className="grades-incomplete">09</p>
                <h4 className="grades-totalscore">Grade Incomplete</h4>
              </div>
              <div className="grades-middle-right">
                <h5 className="grades-grade-sections">20/21/03/011</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="grades-upload-score">
          <button className="grades-upload-btn">Upload Score</button>
        </div>
      </div>
    </div>
  );
}

export default LecturerGrades;
