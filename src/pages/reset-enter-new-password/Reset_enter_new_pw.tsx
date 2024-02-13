import "./Reset_enter_new_pw.css";
import quickgradelogo from "../../assets/quick_grade_logo_with_text_blue.png";
import MainButton from "../../components/buttons/mainButton";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const ResetEnterNewPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const handleUserPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword((event.currentTarget as HTMLInputElement).value);
  };
  const currentRoute = location.pathname;
  const baseURL = currentRoute.startsWith("/students")
    ? "/students"
    : currentRoute.startsWith("/lecturers")
    ? "/lecturers"
    : "";
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = currentRoute.startsWith("/students")
        ? await axiosInstance.post(`/students/reset-password/${token}`, {
            password,
            token,
          })
        : currentRoute.startsWith("/lecturers")
        ? await axiosInstance.post(`/lecturers/reset-password/${token}`, {
            password,
            token,
          })
        : null;
      if (res && res.status === 200) {
        if (res.data.invalidPasswordResetToken || res.data.tokenExpired) {
          navigate(`${baseURL}/forgot-password`);
        } else if (res.data.passwordResetSuccessful) {
          navigate(`/${baseURL}/signin`);
        }
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="re-enter-password-wrapper">
      <div className="re-enter-password-header">
        <img src={quickgradelogo} alt="logo png" />
      </div>
      <div className="re-enter-password-container">
        <div className="form-container">
          <h1 className="form-title">Reset Password</h1>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-inner-container">
              <label className="re-enter-password-label" htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                name="Enter your new password"
                id="password"
                required
                value={password}
                onChange={handleUserPassword}
                className="re-enter-password-input"
              />

              <label
                className="re-enter-password-label"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                name="confirm-password"
                id="confirm-password"
                required
                className="re-enter-password-input"
              />
              <MainButton button_text="Reset Password" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResetEnterNewPasswordPage;
