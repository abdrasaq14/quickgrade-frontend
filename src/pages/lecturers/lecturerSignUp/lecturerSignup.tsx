import axiosInstance from "../../../utils/axiosInstance";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import SignUpPage from "../../../components/signup/signUpPage";
import lecturerPic from "../../../assets/lecturer_signin_bg.png";

export default function LecturerSignup() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  const handleTitle = (event: ChangeEvent<HTMLSelectElement>) => {
    setTitle((event.currentTarget as HTMLSelectElement).value);
  };
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
      !title ||
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
      const res = await axiosInstance.post("/lecturers/signup", {
        title,
        firstName,
        lastName,
        email,
        password,
        department,
        faculty,
      });
      // checking the response
      if (res.status === 200 && res.data.existingLecturerError) {
        setError("Account already exists, try another email");
        setEmail("");
      } else if (res.status === 200 && res.data.failedSignup) {
        setError("signup failed, try again");
        setTitle("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setFaculty("");
        setDepartment("");
        setPassword("");
      } else if (res.status === 200 && res.data.successfulSignup) {
        navigate("/lecturers/confirm-email");
      }
    } catch (error) {
      console.log("error", error);
    }

    // redirect to a different page based on user type
  };

  return (
    <SignUpPage
      signin_link="/lecturers/signin"
      onsubmit={handleSubmit}
      pagepic={lecturerPic}
    >
      {{
        signupFormElement: (
          <>
            {error && <div className="error-message">{error} </div>}

            <label className="signup-form-labels" htmlFor="titleInput">
              Title
            </label>
            <br></br>
            <select
              className="signup-form-selects"
              onChange={handleTitle}
              value={title}
              name="title"
              id="titleInput"
            >
              <option value="">Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Dr">Dr</option>
              <option value="Prof">Prof</option>
            </select>

            <label className="signup-form-labels" htmlFor="firstNameInput">
              First Name
            </label>
            <br></br>
            <input
              className="signup-form-inputs"
              placeholder="Enter your FirstName"
              id="firstNameInput"
              name="firstName"
              value={firstName}
              onChange={handleFirstName}
            />

            <label className="signup-form-labels" htmlFor="lastNameInput">
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
              type="password"
              id="passwordInput"
              name="passwordInput"
              value={password}
              onChange={handleUserPassword}
            />
          </>
        ),
      }}
    </SignUpPage>
  );
}
