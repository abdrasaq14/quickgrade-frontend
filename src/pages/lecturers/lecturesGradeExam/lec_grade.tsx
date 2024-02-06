import "./lec_grade.css";
import SideBar from "../../../components/sidebar/sideBar";
import Header from "../../../components/header/header";
import { Link } from "react-router-dom";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";

interface StudentsResultsDetail {
  studentId: string;
  firstName: string;
  matricNo: string;
  department: string;
  faculty: string;
  courseCode: string;
  objectiveGrade: number;
  theoryGrade: number;
  totalGrade: number;
}
function LecturerGrades() {
  const { lecturerData } = useAuth();
  console.log("lecturer", lecturerData?.lecturerId);
  const [studentsResultsDetail, setStudentsResultsDetail] = useState<
    StudentsResultsDetail[]
  >([]);
  const [selectedSemester, setSelectedSemester] = useState("first semester");
  // const [secondSemester, setSecondSemester] = useState("second");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lecturerId = lecturerData?.lecturerId;
        console.log("lecturerId", lecturerId);
        const res = await axios.get(
          `http://localhost:3000/lecturers/get-graded-exam-objectives/`,
          {
            params: { lecturerId, semester: selectedSemester },
          }
        );

        if (res.status === 200 && res.data.StudentResult) {
          setStudentsResultsDetail(res.data.StudentResult);
        }
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [lecturerData?.lecturerId, selectedSemester]);
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
        {lecturerData && (
          <Header
            newUser={`${lecturerData.title}, ${lecturerData.firstName}}`}
          />
        )}
        {studentsResultsDetail.length > 0 ? (
          <>
            <div className="grades-first">
              <div className="grades-results-info">
                <h3 className="grades-results">
                  Grade Exams/{" "}
                  <span className="grades-results-span">
                    {studentsResultsDetail.length &&
                      studentsResultsDetail[0].courseCode}
                  </span>
                </h3>
              </div>

              <div className="grades-session-info">
                <div className="session-semester-wrapper">
                  <h3 className="grades-sess-info">2022/2023</h3>
                  <select
                    name="semester"
                    id="semester"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setSelectedSemester(e.currentTarget.value)
                    }
                  >
                    <option value="first semester" selected>
                      First Semester
                    </option>
                    <option value="second semester">Second Semester</option>
                  </select>
                </div>

                <h4 className="grades-sess-sub">
                  {studentsResultsDetail.length} submissions
                </h4>
              </div>
            </div>

            <div className="grades-grid-container">
              {studentsResultsDetail.length &&
                studentsResultsDetail.map((student, index) => {
                  return (
                    <>
                      <div key={index} className="grades-course-card">
                        <div className="grades-middle-card">
                          <div className="grades-middle-left">
                            <p
                              className={
                                student.theoryGrade
                                  ? "grades-complete"
                                  : "grades-incomplete"
                              }
                            >
                              {student.theoryGrade
                                ? student.theoryGrade + student.objectiveGrade
                                : student.objectiveGrade}
                            </p>
                            <h4 className="grades-totalscore">
                              {student.theoryGrade
                                ? "Grading Completed"
                                : "Grading Incomplete"}
                            </h4>
                          </div>
                          <div className="grades-middle-right">
                            <h5 className="grades-grade-sections">
                              {student.matricNo}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
            <div className="grades-upload-score">
              <button className="grades-upload-btn">Upload Score</button>
            </div>
          </>
        ) : (
          <>
            <p>You have not set any exam question for this semster, select another semester below</p>
            <select
              name="semester"
              id="semester"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSelectedSemester(e.currentTarget.value)
              }
            >
              <option value="select semester" selected>
                select semester
              </option>
              <option value="first semester">First Semester</option>
              <option value="second semester">Second Semester</option>
            </select>
          </>
        )}
      </div>
    </div>
  );
}

export default LecturerGrades;
