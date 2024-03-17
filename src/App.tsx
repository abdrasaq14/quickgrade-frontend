import StudentLoginPage from "./pages/students/studentLoginPage/StudentLoginPage";
import LecturerLoginPage from "./pages/lecturers/lecturerLoginPage/LecturerLoginPage";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import EnterOtp from "./pages/enter-otp/enter_otp";
import ResetEnterNewPasswordPage from "./pages/reset-enter-new-password/Reset_enter_new_pw";
import LecturerDashboard from "./pages/lecturers/lecturerDashboard/LecturerDashboard";
import StudentEnrolledCourses from "./pages/students/studentEnrolledCourses/studentEnrolledCourses";
import LecturerSignup from "./pages/lecturers/lecturerSignUp/lecturerSignup";
import StudentSignup from "./pages/students/studentSignup/studentSignup";
import { CheckYourEmail } from "./pages/check-you-email/check_your_email";
import { ForgotPassword } from "./pages/forgotPassword/forget_password";
import LecturerResults from "./pages/lecturers/LecturerResultsPage/LecturerResults";
import { StudentDash } from "./pages/students/studentDashboard/StudentDash";
import StudentTakeExamsInstructions from "./pages/students/studentTakeExamsInstructions/studentTakeExamsInstructions";
import TakeExamOBJ from "./pages/students/studentTakeExam/TakeExamOBJ";
import ChangePasswordPage from "./pages/change-password-page/changePasswordPage";
import SetExamPage from "./pages/lecturers/lecturerSetExam/setExamPage";
import { StudentProtectedRoute } from "./components/protectedRoutes/protectedRoute";
import { LecturerProtectedRoute } from "./components/protectedRoutes/protectedRoute";
import SetExamPageSuccessMessage from "./pages/lecturers/lecturerSetExamSuccess/setExamSuccessMessage";
import TakeExamSuccessMessage from "./pages/students/studentTakeExamSuccess/takeExamSuccessMessage";
// import CompletedExamOBJ from "../completed exam/completedExamObj";

import StudentsResults from "./pages/students/studentsresults/Students-Results";

import LecturerGrades from "./pages/lecturers/lecturesGradeExam/lec_grade";

import GradeExamPage from "./pages/grade_exams_page/GradeExamPage";
import GradeExamTheory from "./pages/gradeExamTheory/GradeExamTheory";

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

        <Route path="/students/signin" element={<StudentLoginPage />} />

        <Route path="/lecturers/signin" element={<LecturerLoginPage />} />
        <Route path="/students/confirm-email" element={<EnterOtp />} />
        <Route path="/lecturers/confirm-email" element={<EnterOtp />} />
        {/* forgot password page
        where you enter your email
        */}
        <Route
          path="/lecturers/forgot-password"
          element={<ForgotPassword extraTextLink="/lecturers/signin" />}
        />
        <Route
          path="/students/forgot-password"
          element={<ForgotPassword extraTextLink="/students/signin" />}
        />

        <Route
          path="/students/reset-password/check-your-email"
          element={
            <CheckYourEmail
              location="/students/forgot-password"
              location_text="Click here to resend"
            />
          }
        />
        <Route
          path="/lecturers/reset-password/check-your-email"
          element={
            <CheckYourEmail
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
