import "../../../assets/menu-board.png";
import SideBar from "../../../components/sidebar/sideBar";
import { Link } from "react-router-dom";
function LecturerSideBar() {
  return (
    <SideBar>
      {{
        sidebarElement: (
          <>
            <Link to="/lecturers/dashboard" className="feature-2">
              <img
                className="img-feat"
                src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-menu.svg"
              />
              <span className="text-wrapper-6">Dashboard</span>
            </Link>

            <Link className="feature-2" to="/lecturers/dashboard/set-exams">
              <img
                className="img-2"
                src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
              />

              <span className="text-wrapper-6">Set Exams</span>
            </Link>
            <Link to="/lecturers/dashboard/grade-exams" className="feature-2">
              <img
                className="img-2"
                src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
              />
              <span className="text-wrapper-6">Grade Exams</span>
            </Link>
            {/* <div className="feature-2">
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
              </div> */}
          </>
        ),
      }}
    </SideBar>
  );
}

export default LecturerSideBar;
