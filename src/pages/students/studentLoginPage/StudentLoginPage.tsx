import { LoginPage } from "../../loginPage/Login";
import student_login_page_bg from "../../../assets/loginBackground.png";


function StudentLoginPage() {
  return (
    <LoginPage
  form_title="Sign into QuickGrade"
  id_or_email="Student Registration Number"
  placeholder="Enter your registration number"
  backgroundimage={student_login_page_bg}
  userType="/students/forgot-password"
/>
  )
}

export default StudentLoginPage