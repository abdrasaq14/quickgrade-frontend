import PopUpMessageWrapper from "./PopUpStyle";
import { FaRegCircleCheck } from "react-icons/fa6";

interface PopUpProps {
  message: string;
}
function PopUp({ message }: PopUpProps) {
  return (
    <PopUpMessageWrapper>
      <div className="icon-wrapper">
        <FaRegCircleCheck size={50} color="white" className="success-icon" />
      </div>
      <div className="message-wrapper">
        <p className="success-message">{message}</p>
      </div>
    </PopUpMessageWrapper>
  );
}

export default PopUp;
