import { FormEvent } from "react";
import SuccessMessage from "../../../components/successModal/successMessage";
import { useNavigate, useParams } from "react-router-dom";

function SetExamPageSuccessMessage() {
  const { courseCode } = useParams();
  const navigate = useNavigate();
  // section handling state
  const handleExamSuccessMessage = (e: FormEvent) => {
    e.preventDefault();
    navigate("/lecturers/dashboard/");
  };
  return (
    <SuccessMessage
      successMessage="Successful"
      successMessageText={`You have successfully uploaded ${courseCode} exam questions`}
      onsubmit={handleExamSuccessMessage}
    />
  );
}

export default SetExamPageSuccessMessage;
