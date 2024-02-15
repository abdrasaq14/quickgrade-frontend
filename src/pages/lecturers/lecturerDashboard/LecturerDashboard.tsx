import "./LecturerDashboard.css";
import "../../../assets/menu-board.png";
import LecturerSideBar from "../lecturerSideBar/lecturerSideBar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import axiosInstance from "../../../utils/axiosInstance";
import Header from "../../../components/header/header";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";

interface Exam {
  courseCode: string;
  department: string;
  examDate: string;
  examDuration: string;
  venue: string;
  registered: string;
  noOfStudents: number;
}

function LecturerDashboard() {
  const { lecturerData } = useAuth();

  const [examData, setExamData] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/lecturers/dashboard");

        if (res.status === 200 && res.data.examsTotal) {
          setExamData(res.data.examsTotal);
        }
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="lecturer-dashboard-container">
      <LecturerSideBar />

      <div className="lecturer-dashboard-body">
        {lecturerData && (
          <Header newUser={lecturerData.title + " " + lecturerData.firstName} />
        )}
        <div className="heading-dashboard">Dashboard</div>

        <div className="lecturer-blue-header">
          {lecturerData && (
            <div className="lecturer-blue-header-content">
              <p>
                Lecturer ({lecturerData.title} {lecturerData.firstName}),
                Department of {lecturerData?.department},
              </p>
              <p>Faculty of {lecturerData?.faculty}</p>
              <p>Camouflage University</p>
              <p>Atlanta, Nigeria</p>
            </div>
          )}
        </div>

        {/* Main content */}
        <main className="lecturer-dashboard-exam-timetable-container">
          <div className="lecturer-dashboard-semester-session-container">
            2022/2023 : First Semester
          </div>

          <div className="lecturer-dashboard-exam-timetable-header">
            Course Examination TimeTable
          </div>

          {examData && examData.length > 0 && (
            <table className="lecturer-exam-timetable">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Department</th>
                  <th>Exam Date</th>
                  <th>Venue</th>
                  <th>Registered</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {examData.map((exam, index) => (
                  <tr className="lecturer-exam-timetable-row" key={index}>
                    <td>{exam.courseCode}</td>
                    <td>{exam.department}</td>
                    <td className="date-column">
                      {format(exam.examDate, "d MMM,yyyy / h:mmaa")}
                    </td>
                    <td>Campus E-center</td>
                    <td>{exam.noOfStudents}</td>
                    <td>
                      <button>
                        <p>Set Exam</p>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
}

export default LecturerDashboard;
