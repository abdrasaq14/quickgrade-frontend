import lecturerSignUpBackgrounImage from "../../../assets/lecturer_signin_bg.png";
import SignUpFormComponent from "../../../components/forms/signupPageForm/FormComponent";
function LecturerSignupPage() {
  return (
    <SignUpFormComponent
      lecturerTitle="Title"
      backgroundimage={lecturerSignUpBackgrounImage}
      userType="/lecturers/signin"
      
    />
  );
}

export default LecturerSignupPage;
