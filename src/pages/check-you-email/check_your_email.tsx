import { Link } from "react-router-dom";
import OtherForms from "../../components/forms/OtherForms/OtherForms";
interface CheckYourEmailProps {
  information?: string;
  location: string;
  location_text: string;
}
export function CheckYourEmail(props: CheckYourEmailProps) {
  return (
    <OtherForms
      formHeading="Check your Email"
      children={{
        formElement: (
          <>
            <p className="check-your-email-text">
              We sent a password reset link to your email. Please click the link
              to reset your password.
            </p>
            <Link to={props.location} className="check-your-email-link">
              {" "}
              {props.location_text}
            </Link>
          </>
        ),
      }}
    />
  );
}
