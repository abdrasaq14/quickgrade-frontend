import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OtherForms from "../../components/forms/OtherForms/OtherForms";

const ResetEnterNewPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    <>
      <OtherForms
        formHeading="Reset Password"
        buttonText="Reset Password"
        handleSubmit={handleSubmit}
        disabled={password.length < 6 || password !== confirmPassword}
        children={{
          formElement: (
            <>
              <label className="re-enter-password-label" htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                id="password"
                required
                value={password}
                onChange={handleUserPassword}
              />

              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </>
          ),
        }}
      />
    </>
  );
};
export default ResetEnterNewPasswordPage;
