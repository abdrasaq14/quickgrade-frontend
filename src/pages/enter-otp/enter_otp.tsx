import { useNavigate, useLocation } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import axiosInstance from "../../utils/axiosInstance";
import PopUp from "../../components/pop/PopUp";
import Modal from "../../components/onSubmitModal/OnSubmitModal";
import OtherForms from "../../components/forms/OtherForms/OtherForms";

function EnterOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleUserOtp = (event: ChangeEvent<HTMLInputElement>) => {
    setOtp((event.currentTarget as HTMLInputElement).value);
  };
  const isValid = () => {
    if (!otp) {
      return false;
    }
    return true;
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setShowPopup(true);
      const currentRoute = location.pathname;
      const baseURL = currentRoute.startsWith("/students")
        ? "/students"
        : currentRoute.startsWith("/lecturers")
        ? "/lecturers"
        : "";
      const res = currentRoute.startsWith("/students")
        ? await axiosInstance.post("/students/verify-otp", { otp })
        : currentRoute.startsWith("/lecturers")
        ? await axiosInstance.post("/lecturers/verify-otp", { otp })
        : null;

      // checking the response
      if (res && res.status === 200) {
        if (
          res.data.invalidOtp ||
          res.data.expiredOtpError ||
          res.data.internalServerError
        ) {
          setShowPopup(false);
          setError(res.data.invalidOtp || res.data.expiredOtpError);
        } else if (res.data.OtpVerificationSuccess) {
          setSuccess(true);
          setTimeout(() => {
            setShowPopup(false);
            navigate(`${baseURL}/check-your-email`);
          }, 1200);
        }
      } else {
        setShowPopup(false);
        setError("An error occured, try again");
      }
    } catch (error) {
      setShowPopup(false);
      setError("An error occured, try again");
    }
  };
  return (
    <>
      {success && <PopUp message="Email successfully verified" />}
      {showPopup && <Modal modalText="verifying OTP..." />}
      <OtherForms
        buttonText="Verify OTP"
        formHeading="Verify OTP"
        error={error}
        handleSubmit={handleSubmit}
        disabled={!isValid()}
        children={{
          formElement: (
            <>
              <label>Enter OTP sent to your email:</label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                required
                value={otp}
                onChange={handleUserOtp}
              />
            </>
          ),
        }}
      />
    </>
  );
}

export default EnterOtp;
