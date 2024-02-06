import "./enter_otp.css";
import quickgradelogo from "../../assets/quick_grade_logo_with_text_blue.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import MainButton from "../../components/buttons/mainButton";

interface EnterOtpProps {
  enter_otp_heading: string;
}

function EnterOtp(props: EnterOtpProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const handleUserOtp = (event: ChangeEvent<HTMLInputElement>) => {
    setOtp((event.currentTarget as HTMLInputElement).value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("otp: ", otp);
    try {
      const currentRoute = location.pathname;
      const baseUrl = currentRoute.startsWith("/students")
        ? "http://localhost:3000/students"
        : currentRoute.startsWith("/lecturers")
        ? "http://localhost:3000/lecturers"
        : "";

      console.log("currentRoute: ", currentRoute);

      const res = await axios.post(`${baseUrl}/verify-otp`, {
        otp: otp,
      });
      // checking the response
      if (
        res.status === 200 &&
        (res.data.invalidOtp ||
          res.data.expiredOtpError ||
          res.data.internalServerError)
      ) {
        navigate(`${baseUrl}/confirm-email`);
      } else if (res.status === 200 && res.data.OtpVerificationSuccess) {
        const redirectURL = currentRoute.startsWith("/students")
          ? "/students"
          : currentRoute.startsWith("/lecturers")
          ? "/lecturers"
          : "";
        navigate(`${redirectURL}/check-your-email`);
      }
    } catch (error) {
      console.log("error", error);
    }

    // redirect to a different page based on user type
  };
  return (
    <div className="reset-otp-page-body-wrapper">
      <header className="reset-otp-header">
        <img src={quickgradelogo} alt="Quickgrade Logo" />
      </header>

      <div className="reset-otp-page-app">
        <h1 className="reset-otp-heading">{props.enter_otp_heading}</h1>
        <label className="reset-otp-label">
          Enter the OTP sent to your email:
        </label>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="Enter OTP"
            required
            value={otp}
            onChange={handleUserOtp}
            className="reset-otp-input"
          />
          <MainButton button_text="Submit" />
        </form>
      </div>
    </div>
  );
}

export default EnterOtp;
