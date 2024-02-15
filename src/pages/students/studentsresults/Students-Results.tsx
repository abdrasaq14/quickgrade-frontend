import "./Students-Results.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import searchButton from "../../../assets/searchButton.png";
import Header from "../../../components/header/header";
import StudentSideBar from "../studentsSideBar/studentsSideBar";

interface EnrolledExam {
  courseId: string;
  studentId: string;
  semester: string;
  session: string;
  courseCode: string;
}
interface StudentResult {
  courseCode: string;
  totalScore: number;
  sectionMark: number;
  semester: string;
}

function StudentsResults() {
  const { studentData } = useAuth();
  const navigate = useNavigate();
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);
  const [selectedSemester, setSelectedSemester] =
    useState<string>("first semester");
  const [enrolledExam, setEnrolledExam] = useState<EnrolledExam[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/students/dashboard/get-results", {
          params: {
            semester: selectedSemester,
            studentId: studentData?.studentId,
          },
        });

        if (
          res.status === 200 &&
          (res.data.noTokenError ||
            res.data.tokenExpiredError ||
            res.data.unknownStudent ||
            res.data.internalServeError)
        ) {
          navigate("/students/signin");
        } else if (
          res.status === 200 &&
          res.data.enrolledExam &&
          res.data.StudentResult
        ) {
          setEnrolledExam(res.data.enrolledExam);
          setStudentResults(res.data.StudentResult);
        }
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSemester, studentData]);

  return (
    <div className="students-Results-main-body-wrapper">
      <StudentSideBar />
      <div className="students-Results-right-body-wrapper">
        <Header newUser={studentData?.firstName || ""} />

        <div className="student-results-header">
          <div className="results-info">
            <h3 className="results">Results</h3>
          </div>

          <div className="semester-info">
            <label htmlFor="semester" className="top-selection-labels">
              Semester :
            </label>
            <select
              id="semester"
              className="top-selection-options"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="first semester">First</option>
              <option value="second semester">Second</option>
            </select>
          </div>
          <div className="session-info">
            <label htmlFor="session" className="top-selection-labels">
              Session :
            </label>
            <select id="session" className="top-selection-options">
              <option value="2022/2023">2022/2023</option>
              <option value="2023/2024">2023/2024</option>
            </select>
          </div>
        </div>

        <div className="student-results-search-section">
          <img src={searchButton} alt="search" className="search-button" />
          <input
            className="search-by-course-input"
            type="search"
            placeholder="Search by course code"
          />
        </div>

        <div className="student-results-grid-container">
          {enrolledExam && enrolledExam.length > 0 ? (
            Array.from(
              new Set(enrolledExam.map((exam) => exam.courseCode))
            ).map((courseCode) => {
              const exam = enrolledExam.find(
                (exam) => exam.courseCode === courseCode
              );
              return (
                <div className="course-card" key={exam?.courseId}>
                  <h1 className="card-header">{exam?.courseCode}</h1>
                  {studentResults.length ? (
                    <>
                      {studentResults.map((result, index) => {
                        return (
                          <>
                            <div key={index} className="middle-card">
                              <div className="middle-left">
                                <p className="noresults">
                                  {parseFloat(result.totalScore.toFixed(2))}
                                </p>
                                <h4 className="totalscore">Total Score</h4>
                              </div>
                              <div className="middle-right">
                                <p className="not-ready">
                                  Section A
                                  <span>
                                    {parseFloat(result.totalScore.toFixed(2))}/
                                    {parseFloat(result.sectionMark.toFixed(2))}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          ) : (
            <p>No exams taken this semester</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentsResults;
