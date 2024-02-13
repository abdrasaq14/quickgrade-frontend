import "./forget_password.css";
import quickgradelogo from "../../assets/quick_grade_logo_with_text_blue.png";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import MainButton from "../../components/buttons/mainButton";
import axiosInstance from "../../utils/axiosInstance";

interface ForgotPasswordProps {
  location: string;
}
export function ForgotPassword(props: ForgotPasswordProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const handleUserEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail((event.currentTarget as HTMLInputElement).value);
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const currentRoute = location.pathname;
    const baseURL = currentRoute.startsWith("/students")
      ? "/students"
      : currentRoute.startsWith("/lecturers")
      ? "/lecturers"
      : "";
    try {
      const res = location.pathname.startsWith("/students")
        ? await axiosInstance.post("/students/reset-password", { email })
        : location.pathname.startsWith("/lecturers")
        ? await axiosInstance.post("/lecturers/reset-password", { email })
        : null;

      // checking the response
      if (res && res.status === 200) {
        if (res.data.userNotFoundError) {
          navigate(`${baseURL}/forgot-password`);
        }
        else if (res.data.linkSentSuccessfully) {
          navigate(`${baseURL}/reset-password/check-your-email`);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="reset-otp-body-wrapper">
      <header className="reset-otp-header">
        <img src={quickgradelogo} alt="Quickgrade Logo" />
      </header>

      <div className="reset-otp-app">
        <h1 className="reset-otp-heading">Forgot Password</h1>
        <p className="instruction">
          Enter the email associated with your account and we’ll send an email
          with instruction to reset your password
        </p>
        <label className="reset-otp-label">Email</label>

        <form onSubmit={handleSubmit} className="reset-otp-form">
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="Enter your email"
            required
            className="reset-otp-input"
            value={email}
            onChange={handleUserEmail}
          />
          <MainButton button_text="Forgot Password" />
          <Link to={props.location} className="back-end-login-input-btn">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}
