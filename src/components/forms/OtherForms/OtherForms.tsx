import quickgradelogo from "../../../assets/quick_grade_logo_with_text_blue.png";
import { Link } from "react-router-dom";
import { FormEvent, ReactNode } from "react";
import OtherFormsStyleWrapper from "./otherFormsStyle";
import MainButton from "../../../components/buttons/mainButton";

interface OtherFormsProps {
  formHeading: string;
  children: {
    formElement: ReactNode;
  };
  error?: string;
  handleSubmit?: (e: FormEvent) => void;
  buttonText?: string;
  disabled?: boolean;
  extraTextLink?: string;
}

function OtherForms({
  formHeading,
  children,
  error,
  handleSubmit,
  buttonText,
  disabled,
  extraTextLink,
}: OtherFormsProps) {
  const { formElement } = children;
  return (
    <>
      <OtherFormsStyleWrapper>
        <header className="other-forms-header">
          <Link to={"/"}>
            {" "}
            <img src={quickgradelogo} alt="Quickgrade Logo" />
          </Link>
        </header>

        <div className="other-forms-page-app">
          <h1 className="other-forms-heading">{formHeading}</h1>

          {error && <div className="error-message">{error} </div>}

          <form onSubmit={handleSubmit}>
            {formElement}
            {buttonText && (
              <MainButton
                button_text={buttonText as string}
                disabled={disabled}
              />
            )}
            {extraTextLink && (
              <Link to={extraTextLink} className="extra-text-link">
                Back to Login
              </Link>
            )}
          </form>
        </div>
      </OtherFormsStyleWrapper>
    </>
  );
}

export default OtherForms;
