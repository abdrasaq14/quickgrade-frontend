import { LoginPage } from "../loginPage/Login";
import "./App.css";
import student_login_page_bg from "../../assets/loginBackground.png";
import lecturer_login_page_bg from "../../assets/lecturer_signin_bg.png";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../landingPage/LandingPage";
import EnterOtp from "../enter-otp/enter_otp";
import ResetEnterNewPasswordPage from "../reset-enter-new-password/Reset_enter_new_pw";
import LecturerDashboard from "../lecturerDashboard/LecturerDashboard";
import VerifyEmail from "../verify-email/VerifyEmailPage";
import StudentEnrolledCourses from "../studentEnrolledCourses/studentEnrolledCourses";
import LecturerSignup from "../../pages/lecturerSignUp/lecturerSignup";
import StudentSignup from "../../pages/studentSignup/studentSignup";
import { CheckYourEmail } from "../check-you-email/check_your_email";
import { ForgotPassword } from "../forgotPassword/forget_password";
import LecturerResults from "../LecturerResultsPage/LecturerResults";
import { StudentDash } from "../studentDashboard/StudentDash";
import StudentTakeExamsInstructions from "../studentTakeExamsInstructions/studentTakeExamsInstructions";
import TakeExamOBJ from "../takeExam/TakeExamOBJ";
import StudentsChangePassword from "../Students-Change-Password/StudentsChangePassword";

import SetExamPage from "../setExam/setExamPage";

// import CompletedExamOBJ from "../completed exam/completedExamObj";

import StudentsResults from "../studentsresults/Students-Results";

import LecturerGrades from "../grade_exam/lec_grade";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/students/signin"
          element={
            <LoginPage
              form_title="Sign into QuickGrade"
              id_or_email="Student Registration Number"
              placeholder="Enter your Registration number"
              backgroundImage={student_login_page_bg}
              userType="/students/forgot-password"
            />
          }
        />

        <Route
          path="/lecturers/signin"
          element={
            <LoginPage
              form_title="Sign into QuickGrade"
              id_or_email="Employee ID"
              placeholder="Enter emplooyee id"
              backgroundImage={lecturer_login_page_bg}
              userType="/lecturers/forgot-password"
            />
          }
        />
        <Route
          path="/students/confirm-email"
          element={<EnterOtp enter_otp_heading="Verify OTP" />}
        />
        <Route
          path="/lecturers/confirm-email"
          element={<EnterOtp enter_otp_heading="Verify OTP" />}
        />
        {/* forgot password page
        where you enter your email
        */}
        <Route
          path="/lecturers/forgot-password"
          element={<ForgotPassword location="/lecturers/signin" />}
        />
        <Route
          path="/students/forgot-password"
          element={<ForgotPassword location="/students/signin" />}
        />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route
          path="/students/reset-password/check-your-email"
          element={
            <CheckYourEmail
              information="We sent a password reset link to your email. Please click the link to
              reset your password."
              location="/students/forgot-password"
              location_text="Click here to resend"
            />
          }
        />
        <Route
          path="/lecturers/reset-password/check-your-email"
          element={
            <CheckYourEmail
              information="We sent a password reset link to your email. Please click the link to
              reset your password."
              location="/lecturers/forgot-password"
              location_text="Click here to resend"
            />
          }
        />
        {/* display password reset page where you
        enter new password confirm new password
        */}
        <Route
          path="/students/reset-password/:token"
          element={<ResetEnterNewPasswordPage />}
        />
        <Route
          path="/lecturers/reset-password"
          element={<ResetEnterNewPasswordPage />}
        />

        <Route path="/lecturers/signup" element={<LecturerSignup />} />
        <Route path="/students/signup" element={<StudentSignup />} />
        {/* check your email for matric no/employee ID  */}
        <Route
          path="/students/check-your-email"
          element={
            <CheckYourEmail
              information="We sent your Registration Number and password to your verified email,
              kindly use the detail to login."
              location="/students/signin"
              location_text="Proceed to login"
            />
          }
        />
        <Route
          path="/lecturers/check-your-email"
          element={
            <CheckYourEmail
              information="We sent your EmployeeID and password to your verified email,
            kindly use the detail to login."
              location="/lecturers/signin"
              location_text="Proceed to login"
            />
          }
        />

        <Route path="/lecturers/dashboard" element={<LecturerDashboard />} />
        <Route path="/lecturers/results" element={<LecturerResults />} />
        <Route
          path="/students/dashboard/enrolled-courses"
          element={<StudentEnrolledCourses />}
        />
        {/* take exams instructions  */}
        <Route
          path="/students/dashboard/take-exams/instructions/:courseCode"
          element={<StudentTakeExamsInstructions />}
        />
        {/* take exams  */}
        <Route path="/students/dashboard" element={<StudentDash />} />

        <Route
          path="/students/dashboard/take-exams/:courseCode"
          element={<TakeExamOBJ />}
        />

        <Route
          path="/students/dashboard/change-password"
          element={<StudentsChangePassword />}
        />

        <Route
          path="/lecturers/dashboard/set-exams"
          element={<SetExamPage />}
        />

        {/* <Route
          path="/students/dashboard/completed-exam-obj"
          element={<CompletedExamOBJ />}
        /> */}

        <Route
          path="/students/dashboard/results"
          element={<StudentsResults />}
        />

        {/* <Route
          path="/students/dashboard/completed-exam-theory"
          element={<CompletedExamTheory />}
        /> */}

        <Route
          path="/lecturers/dashboard/results"
          element={<LecturerGrades />}
        />
      </Routes>
    </>
  );
}

export default App;
