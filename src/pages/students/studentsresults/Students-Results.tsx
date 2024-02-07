import "./Students-Results.css";
import SideBar from "../../../components/sidebar/sideBar";
import { Link, useNavigate } from "react-router-dom";
import arrowdown from "../../../assets/arrowdown.png";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import searchButton from "../../../assets/searchButton.png";
import Header from "../../../components/header/header";

interface StudentResult {
  courseCode: number;
  sectionMark: number;
}

interface EnrolledExam {
  courseId: string;
  studentId: string;
  semester: string;
  session: string;
  courseCode: string;
  
}



function StudentsResults() {

  const {studentData} = useAuth();
  const navigate = useNavigate();
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>("first semester");
  const [enrolledExam, setEnrolledExam] = useState<EnrolledExam[]>([]);




  // const handleSearchByCourseCode = (event) => {};

  // const handleViewScript = (courseCode) => {};

  useEffect(() => {
    
  console.log("studentData", studentData?.studentId);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/students/dashboard/get-results`,
          {
            withCredentials: true,
            params: { semester: selectedSemester, studentId: studentData?.studentId},
          }
        );

        console.log(res.data.enrolledExam);

        if (
          res.status === 200 &&
          (res.data.noTokenError ||
            res.data.tokenExpiredError ||
            res.data.unknownStudent ||
            res.data.internalServeError)
        ) {
          navigate("/students/signin");
        } else if (
          res.status === 200 && res.data.enrolledExam
        ) {
          setEnrolledExam(res.data.enrolledExam);
        }
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSemester]);

  return (
    <div className="students-Results-main-body-wrapper">
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
            <select id="semester" className="top-selection-options"
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
        {/* </div className="grid-form"> */}

        {/* <div className="students-results-course-card">
            <h1 className="card-header">{exam.courseCode}</h1>
            <div className="middle-card">
              <div className="middle-left">
                <p className="number">exam.</p>
                <h4 className="totalscore">Total Score</h4>
              </div>
              <div className="middle-right">
                <h5 className="grade-sections">Section A: 20/30</h5>
                <h5 className="grade-sections">Section B: 19/20</h5>
                <h5 className="grade-sections">Section C: 18/20</h5>
              </div>
            </div>
            <div className="course-info">
              <p className="info">View Script</p>
              <img className="arrowdown" src={arrowdown} />
            </div>
          </div> */}

<div className="student-results-grid-container">
  {enrolledExam && enrolledExam.length > 0 ? (
    Array.from(new Set(enrolledExam.map((exam) => exam.courseCode))).map((courseCode) => {
      const exam = enrolledExam.find((exam) => exam.courseCode === courseCode);
      return (
        <div className="course-card" key={exam?.courseId}>
          <h1 className="card-header">{exam?.courseCode}</h1>
          <div className="middle-card">
            <div className="middle-left">
              <p className="noresults">
                No <br /> Results
              </p>
              <h4 className="totalscore">Total Score</h4>
            </div>
            <div className="middle-right">
              <h6 className="not-ready">Result Not Ready</h6>
            </div>
          </div>
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
