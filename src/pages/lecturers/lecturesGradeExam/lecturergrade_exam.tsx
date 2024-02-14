import SideBar from "../../../components/sidebar/sideBar";
import "./view_result.css";
import { Link } from "react-router-dom";
import "../studentDashboard/Dashboard.css";
import "../../assets/menu-board.png";

const Results = () => {
  return (
    <div className="dashboard">
      <section className="hero">
        <div className="hero-content">
          <img
            className="img"
            src="https://c.animaapp.com/IX1zE9E9/img/notification.svg"
          />
          <div className="text-wrapper">Welcome, 22/23/07/019</div>
        </div>
      </section>
      {/* Sidebar */}
      <div className="text-wrapper-2">Dashboard</div>
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
      {/* Main Content */}
      <div className="main-content">
        <div id="header">
          <h1>Admin Dashboard</h1>
        </div>

        <div className="results">
          <p className="result-heading">
            <h2> Results </h2>
          </p>

          <p className="heading">
            <span className="details-left">Course Code</span>
            <span className="details-left"> Course Title </span>

            <span className="details-right">Department</span>
            <span className="details-right">Faculty</span>
            <span id="level">Level</span>
          </p>
        </div>

        <div id="container">
          <div className="result-row">
            <span className="details-left">CE 522</span>
            <span className="details-chem"> Chemical Composition </span>

            <span className="details-dept"> Chemical Engineering </span>
            <span className="details-faculty">Engineering </span>
            <span className="details-level"> 500 </span>
            <span className="details-open">
              {" "}
              <a href="#"> Open </a>{" "}
            </span>
          </div>

          <div className="result-row">
            <span className="details-left">CE 522</span>
            <span className="details-chem"> Chemical Composition </span>
            <span className="details-dept"> Chemical Engineering </span>
            <span className="details-faculty">Engineering </span>
            <span className="details-level"> 500 </span>
            <span className="details-open">
              {" "}
              <a href="#"> Open </a>{" "}
            </span>
          </div>

          <div className="result-row">
            <span className="details-left">CE 522</span>
            <span className="details-chem"> Chemical Composition </span>
            <span className="details-dept"> Chemical Engineering </span>
            <span className="details-faculty"> Engineering </span>
            <span className="details-level">500 </span>
            <span className="details-open">
              {" "}
              <a href="#"> Open </a>{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
