import { LeftImageWrapper } from "./FormBackGround";
import "./FormComponentStyle.css";
import Footer from "../../footer/footer";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainButton from "../../buttons/mainButton";
import axiosInstance from "../../../utils/axiosInstance";
import Modal from "../../modal/Modal";
import PopUp from "../../pop/PopUp";
import { MdCancel } from "react-icons/md";
interface FormComponentProps {
  backgroundimage: string;
  userType: string;
  lecturerTitle?: string;
}

export default function SignUpFormComponent({
  backgroundimage,
  userType,
  lecturerTitle,
}: FormComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [success, setSuccess] = useState(false);
  const [signupFormInputs, setSignupFormInputs] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    faculty: "",
    department: "",
  });
  const handleSignUpFormInputs = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setSignupFormInputs({ ...signupFormInputs, [name]: value });
  };
  const isValid = () => {
    if (lecturerTitle) {
      if (
        !signupFormInputs.firstName ||
        !signupFormInputs.lastName ||
        !signupFormInputs.email ||
        !signupFormInputs.password ||
        !signupFormInputs.department ||
        !signupFormInputs.faculty
      ) {
        return false;
      }
      // setError("All fields are required, try again");
      // return;
    } else {
      if (
        !signupFormInputs.firstName ||
        !signupFormInputs.lastName ||
        !signupFormInputs.email ||
        !signupFormInputs.password ||
        !signupFormInputs.department ||
        !signupFormInputs.faculty
      ) {
        return false;
      }
    }
    return true;
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setShowPopup(true);
      const currentRoute = location.pathname;
      const baseURL = currentRoute.startsWith("/students")
        ? "/students"
        : currentRoute.startsWith("/lecturers")
        ? "/lecturers"
        : "";
      const res = currentRoute.startsWith("/students")
        ? await axiosInstance.post("/students/signup", {
            ...signupFormInputs,
          })
        : currentRoute.startsWith("/lecturers")
        ? await axiosInstance.post("/lecturers/signup", {
            ...signupFormInputs,
          })
        : null;

      // checking the response
      if (res && res.status === 200) {
        if (res.data.successfulSignup) {
          setSuccess(true);
          setSignupFormInputs({
            title: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            faculty: "",
            department: "",
          });

          setTimeout(() => {
            setShowPopup(false);
            navigate(`${baseURL}/confirm-email`);
          }, 1200);
        } else if (
          res.data.existingLecturerError ||
          res.data.existingStudentError
        ) {
          setShowPopup(false);
          setError(
            res.data.existingLecturerError || res.data.existingStudentError
          );
          setSignupFormInputs({
            ...signupFormInputs,
            password: "",
          });
        } else if (res.data.failedSignup) {
          setShowPopup(false);
          setError(res.data.failedSignup);
          setSignupFormInputs({
            ...signupFormInputs,
            password: "",
          });
        } else if (res.data.internalServerError) {
          setShowPopup(false);
          setError(res.data.internalServerError);
          setSignupFormInputs({
            ...signupFormInputs,
            password: "",
          });
        }
      } else {
        setShowPopup(false);
        setError("Network Error, try again later");
        setSignupFormInputs({
          ...signupFormInputs,
          password: "",
        });
      }
    } catch (error) {
      setShowPopup(false);
      setError("Internal Server Error");
      setSignupFormInputs({
        ...signupFormInputs,
        password: "",
      });
    }

    // redirect to a different page based on user type
  };
  return (
    <>
      {success && <PopUp message="Account created successfully" />}
      {showPopup && (
        <Modal modalText="Please wait while we create your account" />
      )}
      <div className="signup-page-main-body-wrapper">
        <div className="signup-form-inner-body-wrapper">
          <LeftImageWrapper backgroundpic={backgroundimage}>
            <h1 className="university-title">Camouflage University</h1>
            <p className="moto-wrapper">
              Inspiring greatness through education
            </p>
          </LeftImageWrapper>

          <div className="signup-form-wrapper">
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="signup-form-top-link-wrapper">
                <Link to="/">
                  <i className="fa-solid fa-house home-btn"></i>
                </Link>
                <p>
                  Already created account?
                  <Link className="signup-form-forgot-password" to={userType}>
                    {" "}
                    Sign in
                  </Link>
                </p>
              </div>
              <div className="sign-up-form-inner-wrapper">
                <h1 className="signup-form-title">
                  Create a QuickGrade Account
                </h1>
                {error && (
                  <div className="error-wrapper">
                    {" "}
                    <p className="error-message">{error} </p>
                    <MdCancel
                      className="cancel-icon"
                      onClick={() => setError("")}
                    />
                  </div>
                )}
                <div className="form-field-group-wrapper">
                  {lecturerTitle ? (
                    <div className="signup-field first-name-title-wrapper">
                      <label className="signup-form-label first-name-label">
                        First Name
                      </label>
                      <div className="title-first-name-wrapper">
                        <select
                          className="signup-form-input title-select"
                          onChange={handleSignUpFormInputs}
                          value={signupFormInputs.title}
                          name="title"
                        >
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Dr.">Dr.</option>
                          <option value="Prof.">Prof.</option>
                        </select>

                        <input
                          className="signup-form-input first-name-input"
                          type="text"
                          value={signupFormInputs.firstName}
                          name="firstName"
                          onChange={handleSignUpFormInputs}
                          placeholder="Enter first name"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="signup-field">
                      <label className="signup-form-label">First Name:</label>
                      <input
                        className="signup-form-input"
                        type="text"
                        value={signupFormInputs.firstName}
                        name="firstName"
                        onChange={handleSignUpFormInputs}
                        placeholder="Enter first name"
                      />
                    </div>
                  )}
                  <div className="signup-field">
                    <label className="signup-form-label">Last Name:</label>
                    <input
                      className="signup-form-input"
                      type="text"
                      value={signupFormInputs.lastName}
                      name="lastName"
                      onChange={handleSignUpFormInputs}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                <div className="form-field-group-wrapper">
                  <div className="signup-field">
                    <label className="signup-form-label">Email:</label>
                    <input
                      className="signup-form-input"
                      type="email"
                      value={signupFormInputs.email}
                      name="email"
                      onChange={handleSignUpFormInputs}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="signup-field">
                    <label className="signup-form-label">Password:</label>
                    <div className="input-icon-wrapper">
                      <i className="fa-solid fa-lock input-icon"></i>
                      <input
                        className="input-that-has-icon"
                        type="password"
                        value={signupFormInputs.password}
                        name="password"
                        onChange={handleSignUpFormInputs}
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-field-group-wrapper">
                  <div className="signup-field">
                    <label className="signup-form-label">Faculty</label>
                    <select
                      className="signup-form-input"
                      onChange={handleSignUpFormInputs}
                      value={signupFormInputs.faculty}
                      name="faculty"
                    >
                      <option value="">Select Faculty</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>
                  <div className="signup-field">
                    <label className="signup-form-label">Department</label>
                    <select
                      className="signup-form-input"
                      onChange={handleSignUpFormInputs}
                      value={signupFormInputs.department}
                      name="department"
                    >
                      <option value="">Select Department</option>
                      <option value="Chemical Engineering">
                        Chemical Engineering
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <MainButton button_text="Sign up" disabled={!isValid()} />
            </form>
          </div>
        </div>
        <Footer footer_text="blue-text" />
      </div>
    </>
  );
}
