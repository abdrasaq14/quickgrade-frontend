import { ReactNode } from "react";
import "./sideBar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface SideBarChildren {
  children: {
    sidebarElement: ReactNode;
  };
}
function SideBar({ children }: SideBarChildren) {
  const { sidebarElement } = children;

  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    try {
      // Make a GET request to your logout route
      const redirectURL = location.pathname.startsWith("/students") ? "/students" : "/lecturers";
      window.localStorage.removeItem("token");
      // await axios.get("http://localhost:3000/students/dashboard/logout", { withCredentials: true });

      navigate(`${redirectURL}/signin`);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <section className="side-bar-default">
      <div className="logo">
        <div className="vuesax-bulk-award-wrapper">
          <img
            className="img-2"
            src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-award.svg"
          />
        </div>
        <div className="text-wrapper-3">QuickGrade</div>
      </div>
      <div className="divider-wrapper">
        <div className="divider">
          <img
            className="vector"
            src="https://c.animaapp.com/IX1zE9E9/img/vector-2.svg"
          />
        </div>
      </div>
      <div className="frame-3">
        <div className="frame-3">
          <div className="text-wrapper-4">Overview</div>
          <div className="frame-4">{sidebarElement}</div>
        </div>
        <div className="frame-3">
          <div className="text-wrapper-4">Others</div>
          <div className="frame-4">
            <div className="feature-2">
              <img
                className="img-2"
                src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-setting-2.svg"
              />

              <Link
                to={
                  location.pathname.startsWith("/students")
                    ? "/students/dashboard/change-password"
                    : "/lecturers/dashboard/change-password"
                }
                className="text-wrapper-6"
              >
                Settings
              </Link>
            </div>
            <div className="feature-2">
              <img
                className="img-2"
                src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-logout.svg"
              />
              <div onClick={handleLogout} className="text-wrapper-6">
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SideBar;
