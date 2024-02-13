import { useState, FormEvent, ChangeEvent } from "react";
import "./LandingPage.css";
import quickgradelogo from "../../assets/quick_grade_logo_with_text.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/footer";
import MainButton from "../../components/buttons/mainButton";

function LandingPage() {
  const [userRole, setUserRole] = useState(""); // State to manage user type selection
  const navigate = useNavigate();

  const handleUserRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserRole((event.currentTarget as HTMLSelectElement).value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await axiosInstance.get(`/${userRole}`);

      if (res.status === 200 && res.data.role === "lecturer") {
        navigate("/lecturers/signin");
      } else if (res.status === 200 && res.data.role === "student") {
        navigate("/students/signin");
      }
    } catch (error) {
      console.log("error", error);
    }

    // redirect to a different page based on user type
  };

  return (
    <>
      <div className="landing-container">
        <div className="landing-page-container">
          <div className="landing-page-sectionA">
            <div className="landing-page-title1">
              <img src={quickgradelogo} alt="logo png" />
            </div>
            <div>
              <h4 className="unlock-your-potential">
                Unlock your exam potential with our management system.
              </h4>
            </div>
          </div>

          <div className="landing-page-sectionB">
            {/* Form */}
            <form className="landing-page-form" onSubmit={handleSubmit}>
              <div className="form-label">
                <label className="landing-page-form-label" htmlFor="userRole">
                  Sign in As:
                </label>

                <select
                  id="userRole"
                  name="userRole"
                  value={userRole}
                  onChange={handleUserRoleChange}
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="lecturer">Lecturer</option>
                  <option value="student">Student</option>
                </select>
              </div>

              {/* <button type="submit">Get Started</button> */}
              <MainButton button_text="Get Started" />

              <div className="landing-page-register-here">
                <p className="no-account-register">
                  No account? Register{" "}
                  <Link to="/students/signup" className="login-here">
                    here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <Footer footer_background="optional-footer-background" />
      </div>
    </>
  );
}

export default LandingPage;
