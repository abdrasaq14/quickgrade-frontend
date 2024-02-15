import "../../../assets/menu-board.png";
import SideBar from "../../../components/sidebar/sideBar";
import { Link } from "react-router-dom";
function LecturerSideBar() {
  return (
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
