import "../../../assets/menu-board.png";
import SideBar from "../../../components/sidebar/sideBar";
import { NavLink } from "react-router-dom";
function StudentSideBar() {
  return (
    <SideBar>
      {{
        sidebarElement: (
          <>
            <NavLink
              to="/students/dashboard"
              className={`feature-2 ${
                location.pathname === "/students/dashboard" ? "active-link" : ""
              }`}
            >
              <img
                className="img-feat"
                src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-menu.svg"
              />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `feature-2 ${isActive ? "active-link" : ""}`
              }
              to="/students/dashboard/enrolled-courses"
            >
              <img
                className="img-2"
                src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-book-square.svg"
              />
              <span>Enrolled Courses</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `feature-2 ${isActive ? "active-link" : ""}`
              }
              to="/students/dashboard/results"
            >
              <img
                className="img-2"
                src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
              />
              <span>Results</span>
            </NavLink>
          </>
        ),
      }}
    </SideBar>
  );
}

export default StudentSideBar;
