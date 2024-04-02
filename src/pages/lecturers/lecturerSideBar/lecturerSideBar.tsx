import "../../../assets/menu-board.png";
import SideBar from "../../../components/sidebar/sideBar";
import { NavLink, useLocation } from "react-router-dom";
function LecturerSideBar() {
  const location = useLocation();
  return (
    <SideBar>
      {{
        sidebarElement: (
          <>
            <NavLink
              to="/lecturers/dashboard"
              className={`feature-2 ${
                location.pathname === "/lecturers/dashboard"
              ? "active-link" : ""}`}
            >
              <img
                className="img-feat"
                src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-menu.svg"
              />
              <span className="text-wrapper-6">Dashboard</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `feature-2 ${isActive ? "active-link" : ""}`
              }
              to="/lecturers/dashboard/set-exams"
            >
              <img
                className="img-2"
                src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
              />

              <span className="text-wrapper-6">Set Exams</span>
            </NavLink>
            <NavLink
              to="/lecturers/dashboard/grade-exams"
              className={({ isActive }) =>
                `feature-2 ${isActive ? "active-link" : ""}`
              }
            >
              <img
                className="img-2"
                src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
              />
              <span className="text-wrapper-6">Grade Exams</span>
            </NavLink>
            {/* <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-refresh-square-2.svg"
                />
                <NavLink
                  to="/lecturers/dashboard/results"
                  className="text-wrapper-6"
                >
                  Results
                </NavLink>
              </div> */}
          </>
        ),
      }}
    </SideBar>
  );
}

export default LecturerSideBar;
