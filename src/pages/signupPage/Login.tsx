import axiosInstance from "../../utils/axiosInstance";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import FormComponent from "../../components/forms/FormComponent";
interface LoginFormProps {
  signin_link: string;
  pagepic: string;
  children: {
    signupFormElement: ReactNode;
  };
  onsubmit: (event: FormEvent) => Promise<void>;
}

export function LoginPage({
  id_or_email,
  placeholder,
  form_title,
  backgroundimage,
  userType,
}: LoginFormProps) {
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
    <FormComponent
      form_title={form_title}
      children={{
        formElement: (
          <>
            <div className="field">
              <label className="login-form-label">{id_or_email}</label>
              <input
                className="login-form-input"
                type="text"
                value={userId}
                onChange={handleUserID}
                placeholder={placeholder}
              />
            </div>
            <div className="field">
              <label className="login-form-label">Password</label>
              <div className="password-icon-wrapper">
                <i className="fa-solid fa-lock login-form-password-icon"></i>
                <input
                  className="password_input"
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
          </>
        ),
      }}
      handleSubmit={handleSubmit}
      backgroundimage={backgroundimage}
      error={error}
    />
  );
}
