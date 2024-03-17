import { useNavigate, useLocation } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import OtherForms from "../../components/forms/OtherForms/OtherForms";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "../../components/modal/Modal";
import PopUp from "../../components/pop/PopUp";

interface ForgotPasswordProps {
  extraTextLink: string;
}
export function ForgotPassword({ extraTextLink }: ForgotPasswordProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUserEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail((event.currentTarget as HTMLInputElement).value);
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setShowPopup(true);
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
          setShowPopup(false);
          navigate(`${baseURL}/forgot-password`);
        } else if (res.data.linkSentSuccessfully) {
          setSuccess(true);
          setTimeout(() => {
            setShowPopup(false);
            navigate(`${baseURL}/reset-password/check-your-email`);
          }, 1200);
        }
      }
    } catch (error) {
      setShowPopup(false);
      console.log("error", error);
    }
  };
  return (
    <>
      {success && <PopUp message="Password changed successfuly" />}
      {showPopup && (
        <Modal modalText="Please wait while we process your request" />
      )}
      <OtherForms
        handleSubmit={handleSubmit}
        formHeading="Forgot Password"
        buttonText="Send Reset Instruction"
        extraTextLink={extraTextLink}
        disabled={!email}
        children={{
          formElement: (
            <>
              <p className="check-your-email-text">
                Enter the email associated with your account and we’ll send an
                email with instruction to reset your password
              </p>
              <label>Email</label>

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
            </>
          ),
        }}
      />
    </>
    // <div className="reset-otp-body-wrapper">
    //   <header className="reset-otp-header">
    //     <img src={quickgradelogo} alt="Quickgrade Logo" />
    //   </header>

    //   <div className="reset-otp-app">
    //     <h1 className="reset-otp-heading">Forgot Password</h1>
    //     <p className="instruction">
    //       Enter the email associated with your account and we’ll send an email
    //       with instruction to reset your password
    //     </p>

    //     <form onSubmit={handleSubmit} className="reset-otp-form">

    //       <MainButton button_text="Forgot Password" />
    //       <Link to={props.location} className="back-end-login-input-btn">
    //         Back to Login
    //       </Link>
    //     </form>
    //   </div>
    // </div>
  );
}
