import "../../../assets/menu-board.png";
import SideBar from "../../../components/sidebar/sideBar";
import { Link } from "react-router-dom";
function StudentSideBar() {
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
              <Link to="/students/dashboard/results" className="text-wrapper-6">
                Results
              </Link>
            </div>
          </>
        ),
      }}
    </SideBar>
  );
}

export default StudentSideBar;
