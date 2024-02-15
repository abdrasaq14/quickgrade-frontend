import "./StudentDash.css";
import { useState, useEffect, MouseEvent } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/header";
import BlueHeader from "../../../components/header/blueHeader/blueHeader";

import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import StudentSideBar from "../studentsSideBar/studentsSideBar";

interface Course {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  creditUnit: number;
}

export const StudentDash = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>("First");
  const { studentData } = useAuth();

  const handleEnrollClick = (e: MouseEvent<HTMLButtonElement>) => {
    const courseCode = e.currentTarget.dataset.coursecode ?? "";
    navigate(`/students/dashboard/take-exams/instructions/${courseCode}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRes = await axiosInstance.get("/students/dashboard", {
          params: { semester: selectedSemester },
        });

        if (
          studentRes.status === 200 &&
          (studentRes.data.noSemesterSelected ||
            studentRes.data.internalServeError)
        ) {
          navigate("/students/signin");
        } else if (studentRes.status === 200 && studentRes.data.courses) {
          setCourses(studentRes.data.courses);
        }
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSemester]);

  return (
    <div className="student-dashboard-container">
      <StudentSideBar />

      <div className="student-dashboard-body">
        <Header newUser={studentData?.firstName || ""} />
        <div className="heading-dashboard">Dashboard</div>

        <BlueHeader
          userDetails={{
            department: studentData?.department || "",
            faculty: `Faculty of ${studentData?.faculty}` || "",
            university: "Camouflage University.",
            location: "Atlanta, Nigeria.",
            matricNo: studentData?.matricNo || "123456789",
          }}
        />

        {courses && (
          <div>
            <div>
              <div className="semester-session-container">
                <div className="semester-div-container">
                  <div>Semester:</div>
                  <div className="session-dropdown">
                    <select
                      className="session-button-default"
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                    >
                      <option value="First">First</option>
                      <option value="Second">Second</option>
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

              <table className="student-result-table">
                <thead>
                  <tr>
                    <th className="student-result-table-header-item">
                      Course Code
                    </th>
                    <th className="student-result-table-header-item">
                      Course Title
                    </th>
                    <th className="student-result-table-header-item">
                      Credit Unit
                    </th>
                    {/* <th className="text-wrapper-12">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 && (
                    <tr className="table-row">
                      <td className="table-row-data" colSpan={5}>
                        No courses available this semester
                      </td>
                    </tr>
                  )}

                  {courses.map((course) => (
                    <tr className="table-row" key={course.courseCode}>
                      <td className="table-row-data">{course.courseCode}</td>
                      <td className="table-row-data">{course.courseTitle}</td>
                      <td className="table-row-data">{course.creditUnit}</td>
                      <td className="table-row-data">
                        <button
                          type="submit"
                          className="enroll-button"
                          data-coursecode={course.courseCode}
                          onClick={handleEnrollClick}
                        >
                          Enroll
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface StudentResultDivProps {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  creditUnit: number;
}

export function StudentResultDiv(props: StudentResultDivProps) {
  return (
    <div className="student-result-table-body">
      <p>{props.courseCode}</p>
      <p>{props.courseTitle}</p>
      <p>{props.creditUnit}</p>
      <button className="enroll-button">Enroll</button>
    </div>
  );
}
