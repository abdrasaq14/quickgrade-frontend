import { useSelector } from "react-redux";
import "./header.css";
import { CiBellOn } from "react-icons/ci";
import { useState } from "react";
import { RootState } from "../../app/store";
interface HeaderProps {
  newUser: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [isInside, setIsInside] = useState<Record<string, boolean>>({});
  const draftcourse = useSelector(
    (state: RootState) => state.lecturer.draftCourses
  );
  console.log("draftcourse", draftcourse)
  return (
    <div className="header-bar">
      <div className="header-bar-text-container">
        <div
          className="notification-wrapper"
          id="notificationWrapper"
          onMouseEnter={() =>
            setIsInside((prevState) => ({
              ...prevState,
              notificationWrapper: true,
            }))
          }
          onMouseLeave={() =>
            setIsInside((prevState) => ({
              ...prevState,
              notificationWrapper: false,
            }))
          }
        >
          {isInside.notificationWrapper && (
            <div className="tooltip-wrapper notification-tooltip-extra-style">
              <span className="tooltip-message">
                You have unchecked notification(s){" "}
              </span>
              <i className="fa-solid fa-caret-down tooltip-icon"></i>
            </div>
          )}
          <CiBellOn className="notification-icon" />
          {/* <span className="new-notification">1</span> */}
          {draftcourse.length && draftcourse[0] !== null ? (
            <span className="new-notification">{draftcourse.length}</span>
          ) : (
            ""
          )}
        </div>
        <p>Welcome, {props.newUser}</p>
      </div>
    </div>
  );
};

export default Header;
