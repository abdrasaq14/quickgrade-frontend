import { ReactNode } from "react";
import "./mainButton.css";

interface MainButtonProps {
  button_text: string;
  disabled?: boolean;
  loader?: ReactNode;
}
export default function MainButton(props: MainButtonProps) {
  return (
    <button
      type="submit"
      className="main-btn-component"
      disabled={props.disabled}
    >
      {props.loader}
      {props.button_text}
    </button>
  );
}
