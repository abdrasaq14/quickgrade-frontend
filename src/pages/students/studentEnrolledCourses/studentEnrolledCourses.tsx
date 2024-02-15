import "./studentEnrolledCourses.css";
import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { format, isBefore, isAfter } from "date-fns";
import Header from "../../../components/header/header";
import BlueHeader from "../../../components/header/blueHeader/blueHeader";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import StudentSideBar from "../studentsSideBar/studentsSideBar";

interface Exam {
  examId: string;
  courseCode: string;
  courseTitle: string;
  examDate: Date;
}

function StudentEnrolledCourses() {
  const { studentData } = useAuth();
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedSemester, setSelectedSemester] =
    useState<string>("first semester");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRes = await axiosInstance.get(
          "/students/dashboard/enrolled-courses",
          {
            params: { semester: selectedSemester },
          }
        );
        if (
          studentRes.status === 200 &&
          (studentRes.data.noSemesterSelected ||
            studentRes.data.internalServeError)
        ) {
          navigate("/students/signin");
        } else if (studentRes.status === 200 && studentRes.data.exams) {
          setExams(studentRes.data.exams);
        }
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSemester]);

  const calculateStatus = (
    examDate: Date
  ): { status: string; style: React.CSSProperties } => {
    const currentDate = new Date();

    // const threeHoursAfterExam = new Date(examDate.setHours(examDate.getHours() + 3));

    if (isBefore(currentDate, examDate)) {
      return { status: "Unavailable", style: { color: "grey" } };
    } else if (isAfter(currentDate, examDate)) {
      return { status: "Expired", style: { color: "red" } };
    } else {
      return { status: "Take exam", style: { color: "green" } };
    }
  };

  return (
    <>
      <div className="enrolled-courses-page-container">
        <StudentSideBar />

        <section className="enrolled-courses-dashboard-container">
          <Header newUser={studentData?.firstName || ""} />

          <main className="enrolled-courses-body">
            <div className="enrolled-courses-title">Enrolled Courses</div>

            <BlueHeader
              userDetails={{
                matricNo: studentData?.matricNo || "",
                department: studentData?.department || "",
                faculty: studentData?.faculty || "",
                university: "Camouflage University.",
                location: "Atlanta, Nigeria.",
              }}
            />

            <div className="enrolled-courses-container">
              <div className="enrolled-courses-year">
                <div className="enrolled-courses-semester">
                  <label htmlFor="courses-semester">Semester: </label>
                  <select
                    name="courses-semester"
                    id="courses-semester"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                  >
                    <option value="first semester">First</option>
                    <option value="second semester">Second</option>
                  </select>
                </div>
                <div className="enrolled-courses-session">
                  <label htmlFor="courses-session">Session: </label>
                  <select name="courses-session" id="courses-session">
                    <option value="">2023/2024</option>
                  </select>
                </div>
              </div>

              <div className="enrolled-courses-timetable">
                <h5>Examinations Timetable</h5>
              </div>

              <div className="enrolled-courses-table-container">
                <table className="enrolled-courses-table">
                  <thead className="enrolled-courses-table-header">
                    <tr>
                      <th>Course Code</th>
                      <th>Course Title</th>
                      <th>Date/Time</th>
                      <th>Venue</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="enrolled-courses-table-body">
                    {exams.length === 0 && (
                      <tr>
                        <td colSpan={5}>No exams available</td>
                      </tr>
                    )}
                    {exams.map((exam) => (
                      <tr key={exam.examId}>
                        <td>{exam.courseCode}</td>
                        <td>{exam.courseTitle}</td>
                        <td>{format(exam.examDate, "d MMM, yyyy / h:mmaa")}</td>
                        <td>Campus E-center</td>
                        <td style={calculateStatus(exam.examDate).style}>
                          {calculateStatus(exam.examDate).status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  );
}

export default StudentEnrolledCourses;
