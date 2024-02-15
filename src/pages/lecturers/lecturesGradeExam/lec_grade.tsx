import "./lec_grade.css";
import Header from "../../../components/header/header";
import LecturerSideBar from "../lecturerSideBar/lecturerSideBar";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import axiosInstance from "../../../utils/axiosInstance";
import { useState, useEffect } from "react";

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
  const [studentsResultsDetail, setStudentsResultsDetail] = useState<
    StudentsResultsDetail[]
  >([]);
  const [selectedSemester, setSelectedSemester] = useState("first semester");
  // const [secondSemester, setSecondSemester] = useState("second");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lecturerId = lecturerData?.lecturerId;
        const res = await axiosInstance.get(
          "/lecturers/get-graded-exam-objectives/",
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
      <LecturerSideBar />
      <div className="grades-right-body-wrapper">
        {lecturerData && (
          <Header
            newUser={`${lecturerData.title}, ${lecturerData.firstName}`}
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
                <div className="semester-session-container">
                  <div className="semester-div-container">
                    <div>Semester:</div>
                    <div className="session-dropdown">
                      <select
                        className="session-button-default"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                      >
                        <option value="first semester">First</option>
                        <option value="second semester">Second</option>
                      </select>
                    </div>
                  </div>
                  <div className="session-div-container">
                    <div>Session:</div>
                    <div className="session-dropdown">
                      <select className="session-button-default">
                        <option>2023/2024</option>
                      </select>
                    </div>
                  </div>
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
                                ? parseFloat((student.theoryGrade + student.objectiveGrade).toFixed(2))
                                : parseFloat((student.objectiveGrade).toFixed(2))}
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
            <div
              style={{ marginTop: "1rem", marginLeft: "1rem" }}
              className="semester-session-container"
            >
              <div className="semester-div-container">
                <div>Semester:</div>
                <div className="session-dropdown">
                  <select
                    className="session-button-default"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                  >
                    <option value="first semester">First</option>
                    <option value="second semester">Second</option>
                  </select>
                </div>
              </div>
              <div className="session-div-container">
                <div>Session:</div>
                <div className="session-dropdown">
                  <select className="session-button-default">
                    <option>2023/2024</option>
                  </select>
                </div>
              </div>
            </div>

            <h3 style={{ marginLeft: "1rem", marginTop: "1rem" }}>
              No exams have been set for this semester
            </h3>
          </>
        )}
      </div>
    </div>
  );
}

export default LecturerGrades;
