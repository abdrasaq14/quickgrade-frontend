import "./LecturerDashboard.css";
import "../../../assets/menu-board.png";
import SideBar from "../../../components/sidebar/sideBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import Header from "../../../components/header/header";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";

interface Exam {
  courseCode: string;
  department: string;
  examDate: string;
  examDuration: string;
  venue: string;
  registered: string;
  noOfStudents: number
}


function LecturerDashboard() {
  const { lecturerData } = useAuth();

  const [examData, setExamData] = useState<Exam[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/lecturers/dashboard`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200 && res.data.examsTotal) {
          setExamData(res.data.examsTotal);
          
          console.log(res.data);
        }
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="lecturer-dashboard-container">
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

      <div className="lecturer-dashboard-body">
        {lecturerData && <Header newUser={lecturerData.firstName} />}
        <div className="heading-dashboard">Dashboard</div>
        

        <div className="lecturer-blue-header">
          {lecturerData && (
            <div className="lecturer-blue-header-content">
              <p>
                Lecturer ({lecturerData.title} {lecturerData.firstName}), Department of{" "}
                {lecturerData?.department},
              </p>
              <p>Faculty of {lecturerData?.department}</p>
              <p>Camouflage University</p>
              <p>Atlanta, Nigeria</p>
            </div>
          )}
        </div>

        {/* Main content */}
        <main className="lecturer-dashboard-exam-timetable-container">
          <div className="lecturer-dashboard-semester-session-container">
          2022/2023 : Second Semester 
           </div>

          
          <div className="lecturer-dashboard-exam-timetable-header">Course Examination TimeTable</div>

          {examData && examData.length > 0 && (

            <table className="lecturer-exam-timetable" >
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
                    <td className="date-column">{format(exam.examDate, "d MMM,yyyy / h:mmaa")}</td>
                    <td>Campus E-center</td>
                    <td>{exam.noOfStudents}</td>
                    <td><button><p>Set Exam</p></button>
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
