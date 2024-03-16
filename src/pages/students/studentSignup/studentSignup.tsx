import studentSignUpBackgrounImage from "../../../assets/loginBackground.png";
import SignUpFormComponent from "../../../components/forms/signupPageForm/FormComponent";
function StudentSignupPage() {
  return (
    <SignUpFormComponent
      backgroundimage={studentSignUpBackgrounImage}
      userType="/students/signin"
    />
  );
}

export default StudentSignupPage;
