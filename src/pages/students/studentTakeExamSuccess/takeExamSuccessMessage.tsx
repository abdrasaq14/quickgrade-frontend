import { FormEvent } from "react";
import SuccessMessage from "../../../components/successModal/successMessage";
import { useNavigate, useParams } from "react-router-dom";

function TakeExamSuccessMessage() {
  const { courseCode } = useParams();
  const navigate = useNavigate();
  // section handling state
  const handleExamSuccessMessage = (e: FormEvent) => {
    e.preventDefault();
    navigate("/students/dashboard/");
  };
  return (
    <SuccessMessage
      successMessage="Submission successful"
      successMessageText={`You have submitted ${courseCode} examinations.`}
      onsubmit={handleExamSuccessMessage}
    />
  );
}

export default TakeExamSuccessMessage;
