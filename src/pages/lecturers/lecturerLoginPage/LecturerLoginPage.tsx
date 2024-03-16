import lecturer_login_page_bg from "../../../assets/lecturer_signin_bg.png";
import LoginFormComponent from "../../../components/forms/loginPageForm/FormComponent";

function LecturerLoginPage() {
  return (
    <LoginFormComponent
      form_title="Sign into QuickGrade"
      id_or_email="Employee ID"
      placeholder="Enter employee id"
      backgroundimage={lecturer_login_page_bg}
      userType="/lecturers/forgot-password"
    />
  );
}

export default LecturerLoginPage;
