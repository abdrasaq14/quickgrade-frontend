import lecturer_login_page_bg from "../../../assets/lecturer_signin_bg.png";
import { LoginPage } from "../../loginPage/Login";
function LecturerLoginPage() {
  return (
    <LoginPage
      form_title="Sign into QuickGrade"
      id_or_email="Employee ID"
      placeholder="Enter employee id"
      backgroundimage={lecturer_login_page_bg}
      userType="/lecturers/forgot-password"
    />
  );
}

export default LecturerLoginPage;
