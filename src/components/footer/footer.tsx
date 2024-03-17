import "./footer.css";

interface FooterProps {
  footer_background?: string;
  footer_text?: string;
}
function Footer(props: FooterProps) {
  const combinedClasses = `footer-component ${props.footer_background}`;
  const footerClass = `footer-text ${props.footer_text}`;
  return (
    <footer className={combinedClasses}>
      <div className="inner-footer-wrapper">
        <div className="left-footer-text-wrapper">
          <p className="footer-text">QuickGrade</p>
        </div>
        <div className="center-footer-text-wrapper">
          <p className="footer-text">QuickGrade Inc. All rights Reserved</p>
        </div>
        <div className="right-footer-text-wrapper">
          <p className={footerClass}>Privacy</p>
          <p className={footerClass}>Terms</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
