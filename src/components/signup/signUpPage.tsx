import { FormEvent, ReactNode } from "react";
import "./signUpPageStyle.css";
import { Link } from "react-router-dom";

import Footer from "../footer/footer";
import MainButton from "../buttons/mainButton";
interface SignUpPageProps {
  signin_link: string;
  pagepic: string;
  children: {
    signupFormElement: ReactNode;
  };
  onsubmit: (event: FormEvent) => Promise<void>;
}

function SignUpPage({ signin_link, onsubmit, pagepic, children }: SignUpPageProps) {
  const { signupFormElement } = children;
  return (
    <div className="entire-signup-page-container">
      <div className="main-body-container">
        <div className="image-card-section">
          <div className="signup-overlay"></div>
          <div className="image-card-container">
            <img
              src={pagepic}
              alt="two graduants smiling"
              className="signup-page-photo"
            />
          </div>
          <div className="page-title-container">
            <h4 className="signup-uni-title">Camouflage University</h4>
            <h2 className="signup-page-title-note">
              Inspiring greatness through education.
            </h2>
          </div>
        </div>

        <div className="form-section">
          <div className="whole-sign-up-form-container">
            <div className="top-sign-in-message">
              Already Created an Account? Sign in
              <Link to={signin_link}> here</Link>
            </div>

            <div className="sign-in-form-container">
              <div className="sign-in-form-message">
                Create QuickGrade Account
              </div>

              <form className="sign-up-form" onSubmit={onsubmit}>
                {signupFormElement}

                <MainButton button_text="Sign up" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer footer_text="blue-text" />
    </div>
  );
}

export default SignUpPage;
