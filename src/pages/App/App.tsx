import { LoginPage } from "../loginPage/Login";
import "./App.css";
import student_login_page_bg from "../../assets/loginBackground.png";
import lecturer_login_page_bg from "../../assets/lecturer_signin_bg.png";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../landingPage/LandingPage";
import EnterOtp from "../enter-otp/enter_otp";
import ResetEnterNewPasswordPage from "../reset-enter-new-password/Reset_enter_new_pw";
import LecturerDashboard from "../lecturers/lecturerDashboard/LecturerDashboard";
import VerifyEmail from "../verify-email/VerifyEmailPage";
import StudentEnrolledCourses from "../students/studentEnrolledCourses/studentEnrolledCourses";
import LecturerSignup from "../lecturers/lecturerSignUp/lecturerSignup";
import StudentSignup from "../students/studentSignup/studentSignup";
import { CheckYourEmail } from "../check-you-email/check_your_email";
import { ForgotPassword } from "../forgotPassword/forget_password";
import LecturerResults from "../lecturers/LecturerResultsPage/LecturerResults";
import { StudentDash } from "../students/studentDashboard/StudentDash";
import StudentTakeExamsInstructions from "../students/studentTakeExamsInstructions/studentTakeExamsInstructions";
import TakeExamOBJ from "../students/studentTakeExam/TakeExamOBJ";
import ChangePasswordPage from "../change-password-page/changePasswordPage";
import SetExamPage from "../lecturers/lecturerSetExam/setExamPage";
import { StudentProtectedRoute } from "../../components/protectedRoutes/protectedRoute";
import { LecturerProtectedRoute } from "../../components/protectedRoutes/protectedRoute";
import SetExamPageSuccessMessage from "../lecturers/lecturerSetExamSuccess/setExamSuccessMessage";
import TakeExamSuccessMessage from "../students/studentTakeExamSuccess/takeExamSuccessMessage";
// import CompletedExamOBJ from "../completed exam/completedExamObj";

import StudentsResults from "../students/studentsresults/Students-Results";

import LecturerGrades from "../lecturers/lecturesGradeExam/lec_grade";

import GradeExamPage from "../grade_exams_page/GradeExamPage";
import GradeExamTheory from "../gradeExamTheory/GradeExamTheory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* lectuers proteced routes */}

        <Route
          path="/lecturers/dashboard/*"
          element={
            <LecturerProtectedRoute>
              <Routes>
                <Route index element={<LecturerDashboard />} />
                <Route path="results" element={<LecturerResults />} />
                <Route path="set-exams" element={<SetExamPage />} />
                <Route path="grade-exams" element={<LecturerGrades />} />
                <Route
                  path="set-exams/success/:courseCode"
                  element={<SetExamPageSuccessMessage />}
                />
                <Route
                  path="change-password"
                  element={<ChangePasswordPage />}
                />
              </Routes>
            </LecturerProtectedRoute>
          }
        />

        {/* students protected routes */}
        <Route
          path="/students/dashboard/*"
          element={
            <StudentProtectedRoute>
              <Routes>
                {/* this will render like index */}
                <Route index element={<StudentDash />} />
                {/* take exams */}
                <Route
                  path="take-exams/:courseCode"
                  element={<TakeExamOBJ />}
                />
                <Route path="results" element={<StudentsResults />} />
                <Route
                  path="take-exams/instructions/:courseCode"
                  element={<StudentTakeExamsInstructions />}
                />
                <Route
                  path="enrolled-courses"
                  element={<StudentEnrolledCourses />}
                />
                <Route
                  path="change-password"
                  element={<ChangePasswordPage />}
                />
                <Route
                  path="grade-exams-dashboard"
                  element={<GradeExamPage />}
                />
                <Route
                  path="take-exams/success/:courseCode"
                  element={<TakeExamSuccessMessage />}
                />
              </Routes>
            </StudentProtectedRoute>
          }
        />

        <Route
          path="/students/signin"
          element={
            <LoginPage
              form_title="Sign into QuickGrade"
              id_or_email="Student Registration Number"
              placeholder="Enter your registration number"
              backgroundimage={student_login_page_bg}
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
              placeholder="Enter employee id"
              backgroundimage={lecturer_login_page_bg}
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
              information="We sent your Registration Number to your verified email,
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
              information="We sent your EmployeeID to your verified email,
            kindly use the detail to login."
              location="/lecturers/signin"
              location_text="Proceed to login"
            />
          }
        />

        <Route
          path="/lecturers/grade-exams-dashboard"
          element={<GradeExamPage />}
        />
        <Route
          path="/lecturers/grade-exams-theory"
          element={<GradeExamTheory />}
        />
      </Routes>
    </>
  );
}

export default App;
