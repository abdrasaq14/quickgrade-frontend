import axiosInstance from "../../utils/axiosInstance";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import FormComponent from "../../components/forms/FormComponent";
interface signupFormProps {
  signin_link: string;
  backgroundimage: string;
  handleSubmit: (e: FormEvent) => Promise<void>;
  error: string;
}

export default function SignupPage({
  signin_link,
  pagepic,
  children,
  onsubmit,
}: signupFormProps) {
  const { signupFormElement } = children;
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  const handleFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName((event.currentTarget as HTMLInputElement).value);
  };
  const handleLastName = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName((event.currentTarget as HTMLInputElement).value);
  };
  const handleUSerEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail((event.currentTarget as HTMLInputElement).value);
  };
  const handleUserPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword((event.currentTarget as HTMLInputElement).value);
  };
  const handleUserFaculty = (event: ChangeEvent<HTMLSelectElement>) => {
    setFaculty((event.currentTarget as HTMLSelectElement).value);
  };
  const handleUserDepartment = (event: ChangeEvent<HTMLSelectElement>) => {
    setDepartment((event.currentTarget as HTMLSelectElement).value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !department ||
      !faculty
    ) {
      setError("All fields are required, try again");
      return;
    }

    try {
      const currentRoute = location.pathname;
      console.log("currentRoute: ", currentRoute);

      const res = await axiosInstance.post(`/students/signup`, {
        firstName,
        lastName,
        email,
        password,
        department,
        faculty,
      });
      // checking the response
      if (res.status === 200) {
        if (res.data.existingStudentError) {
          setError("Account already exists, try another email");
          setEmail("");
        } else if (res.data.failedSignup) {
          setError("Internal server error, try again");
          setFirstName("");
          setLastName("");
          setEmail("");
          setFaculty("");
          setDepartment("");
          setPassword("");
        } else if (res.data.successfulSignup) {
          navigate("/students/confirm-email");
        }
      } else {
        setError("signup failed, try again");
        setFirstName("");
        setLastName("");
        setEmail("");
        setFaculty("");
        setDepartment("");
        setPassword("");
      }
    } catch (error) {
      console.log("error", error);
    }

    // redirect to a different page based on user type
  };

  return (
    <FormComponent
      form_title={"Create QuickGrade Account"}
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
