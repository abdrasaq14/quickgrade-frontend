import "./LecturerDashboard.css";
import "../../../assets/menu-board.png";
import LecturerSideBar from "../lecturerSideBar/lecturerSideBar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Header from "../../../components/header/header";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import {
  InnerWrapper,
  OuterWrapper,
} from "../../../components/dashboardStyle/ResponsivenessStyle";
import { fetchExamTimeTable } from "../../../api/exams";
import { Exam } from "../../../interfaces/examsInterface";


function LecturerDashboard() {
  const { lecturerData } = useAuth();

  const [examData, setExamData] = useState<Exam[]>([]);

  useEffect(() => {
    fetchExamTimeTable().then((data) => {
      setExamData(data);
    });
  }, []);

  return (
    <OuterWrapper>
      <LecturerSideBar />

      <InnerWrapper>
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

          {examData && examData.length ? (
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
          ) : (
            <p className="no-exam-paragraph">
              No exam data available, Kindly set an Exam
            </p>
          )}
        </main>
      </InnerWrapper>
    </OuterWrapper>
  );
}

export default LecturerDashboard;
