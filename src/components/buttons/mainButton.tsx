import "./mainButton.css";

interface MainButtonProps {
  button_text: string;
  disabled?: boolean;
}
export default function MainButton(props: MainButtonProps) {
  return (
    <button
      type="submit"
      className="main-btn-component"
      disabled={props.disabled}
    >
      {props.button_text}
    </button>
  );
}
