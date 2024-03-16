import { LeftImageWrapper } from "./FormBackGround";
import "./FormComponentStyle.css";
import Footer from "../../components/footer/footer";
import { FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import MainButton from "../../components/buttons/mainButton";
interface FormComponentProps {
  form_title: string;
  backgroundimage: string;
  children: { formElement: ReactNode };
  handleSubmit: (e: FormEvent) => void;
  error: string;
}

export default function FormComponent({
  children,
  form_title,
  handleSubmit,
  backgroundimage,
  error,
}: FormComponentProps) {
  const { formElement } = children;
  return (
    <div className="login-page-main-body-wrapper">
      <div className="login-form-inner-body-wrapper">
        <LeftImageWrapper backgroundpic={backgroundimage}>
          <h1 className="university-title">Camouflage University</h1>
          <p className="moto-wrapper">Inspiring greatness through education</p>
        </LeftImageWrapper>

        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <Link to="/">
              <i className="fa-solid fa-house home-btn "></i>
            </Link>
            <h1 className="login-form-title">{form_title}</h1>
            {error && <div className="error-message">{error} </div>}
            {formElement}
            <MainButton button_text="Sign in" />
          </form>
        </div>
      </div>
      <Footer footer_text="blue-text" />
    </div>
  );
}
