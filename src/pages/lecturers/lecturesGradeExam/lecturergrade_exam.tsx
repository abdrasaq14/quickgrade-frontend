import "./view_result.css";
import "../studentDashboard/Dashboard.css";
import "../../assets/menu-board.png";
import LecturerSideBar from "../lecturerSideBar/lecturerSideBar";

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
      <LecturerSideBar />
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
