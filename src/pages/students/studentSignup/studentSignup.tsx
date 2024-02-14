import axiosInstance from "../../../utils/axiosInstance";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignUpPage from "../../../components/signup/signUpPage";
import studentPic from "../../../assets/sign_up_page_bg_pic copy.png";

export default function StudentSignup() {
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
    <SignUpPage
      signin_link="/students/signin"
      onsubmit={handleSubmit}
      pagepic={studentPic}
    >
      {{
        signupFormElement: (
          <>
            {error && <div className="error-message">{error} </div>}
            <label className="signup-form-labels" htmlFor="emailInput">
              First Name
            </label>
            <br></br>
            <input
              className="signup-form-inputs"
              placeholder="Enter your first name"
              id="firstNameInput"
              name="firstName"
              value={firstName}
              onChange={handleFirstName}
            />

            <label className="signup-form-labels" htmlFor="emailInput">
              Last Name
            </label>
            <br></br>
            <input
              className="signup-form-inputs"
              placeholder="Enter your last name"
              id="lastNameInput"
              name="lastName"
              value={lastName}
              onChange={handleLastName}
            />

            <label className="signup-form-labels" htmlFor="emailInput">
              Email
            </label>
            <br></br>
            <input
              className="signup-form-inputs"
              placeholder="Enter email"
              id="emailInput"
              name="email"
              value={email}
              onChange={handleUSerEmail}
            />

            <label className="signup-form-labels" htmlFor="facultyInput">
              Faculty
            </label>
            <select
              value={faculty}
              className="signup-form-selects"
              onChange={handleUserFaculty}
              name="faculty"
              id="facultyInput"
            >
              <option value="">Select Faculty</option>
              <option value="Engineering">Engineering</option>
            </select>

            <label className="signup-form-labels" htmlFor="departmentInput">
              Department
            </label>
            <select
              value={department}
              className="signup-form-selects"
              onChange={handleUserDepartment}
              name="department"
              id="departmentInput"
            >
              <option value="">Select Department</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
            </select>

            <label className="signup-form-labels" htmlFor="passwordInput">
              Password
            </label>
            <input
              className="signup-form-pw-input"
              placeholder="Enter password"
              id="passwordInput"
              name="passwordInput"
              type="password"
              value={password}
              onChange={handleUserPassword}
            />
          </>
        ),
      }}
    </SignUpPage>
  );
}
