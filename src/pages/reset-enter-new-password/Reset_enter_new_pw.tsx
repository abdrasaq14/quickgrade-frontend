import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OtherForms from "../../components/forms/OtherForms/OtherForms";
import Modal from "../../components/onSubmitModal/OnSubmitModal";
import PopUp from "../../components/pop/PopUp";
const ResetEnterNewPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setShowPopup(true);
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
          setShowPopup(false);
          setError(res.data.invalidPasswordResetToken || res.data.tokenExpired);
        } else if (res.data.passwordResetSuccessful) {
          setSuccess(true);
          setTimeout(() => {
            setShowPopup(false);
            navigate(`${baseURL}/signin`);
          }, 1200);
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
      {success && <PopUp message="Email successfully verified" />}
      {showPopup && <Modal modalText="verifying OTP..." />}

      <OtherForms
        formHeading="Reset Password"
        buttonText="Reset Password"
        handleSubmit={handleSubmit}
        disabled={password.length < 6 || password !== confirmPassword}
        error={error}
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
