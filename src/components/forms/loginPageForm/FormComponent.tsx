import { LeftImageWrapper } from "./FormBackGround";
import "./FormComponentStyle.css";
import Footer from "../../footer/footer";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainButton from "../../buttons/mainButton";
import axiosInstance from "../../../utils/axiosInstance";
import { MdCancel } from "react-icons/md";
interface FormComponentProps {
  id_or_email: string;
  placeholder: string;
  form_title: string;
  backgroundimage: string;
  userType: string;
}

export default function LoginFormComponent({
  form_title,
  backgroundimage,
  id_or_email,
  placeholder,
  userType,
}: FormComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUserID = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId((event.currentTarget as HTMLInputElement).value);
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword((event.currentTarget as HTMLInputElement).value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!userId || !password) {
      setError("All fields are required, try again");
      return;
    }

    try {
      const currentRoute = location.pathname;
      const baseURL = currentRoute.startsWith("/students")
        ? "/students"
        : currentRoute.startsWith("/lecturers")
        ? "/lecturers"
        : "";
      const res = currentRoute.startsWith("/students")
        ? await axiosInstance.post("/students/login", {
            matricNo: userId,
            password: password,
          })
        : currentRoute.startsWith("/lecturers")
        ? await axiosInstance.post("/lecturers/login", {
            employeeID: userId,
            password: password,
          })
        : null;
      if (res && res.status === 200) {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate(`${baseURL}/dashboard`);
        } else if (res.data.inValidPassword) {
          setError("Invalid password");
          setUserId("");
          setPassword("");
        } else if (res.data.studentNotFoundError) {
          setError("Student not found, invalid registration number");
          setUserId("");
          setPassword("");
        } else if (res.data.lecturerNotFoundError) {
          setError("Lecturer not found, invalid employee id");
          setUserId("");
          setPassword("");
        }
      } else {
        setError("Internal Server Error");
      }
    } catch (error) {
      setError("Internal Server Error");
    }

    // redirect to a different page based on user type
  };

  return (
    <div className="login-page-main-body-wrapper">
      <div className="login-form-inner-body-wrapper">
        <LeftImageWrapper backgroundpic={backgroundimage}>
          <h1 className="university-title">Camouflage University</h1>
          <p className="moto-wrapper">Inspiring greatness through education</p>
        </LeftImageWrapper>

        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <Link to="/">
              <i className="fa-solid fa-house login-home-btn"></i>
            </Link>
            <h1 className="login-form-title">{form_title}</h1>
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
            <div className="field">
              <label className="login-form-label">{id_or_email}</label>
              <div className="input-icon-wrapper">
                <i className="fa-solid fa-user input-icon"></i>
                <input
                  className="input-that-has-icon"
                  type="text"
                  value={userId}
                  onChange={handleUserID}
                  placeholder={placeholder}
                />
              </div>
            </div>
            <div className="field">
              <label className="login-form-label">Password</label>
              <div className="input-icon-wrapper">
                <i className="fa-solid fa-lock input-icon"></i>
                <input
                  className="input-that-has-icon"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="Enter password"
                />
              </div>
              <Link className="login-form-forgot-password" to={userType}>
                {" "}
                Forgot password?
              </Link>
            </div>
            <MainButton button_text="Sign in" />
          </form>
        </div>
      </div>
      <Footer footer_text="blue-text" />
    </div>
  );
}
