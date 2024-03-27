import { useLocation } from "react-router-dom";
import { FormEvent } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import { useAuth } from "../../components/protectedRoutes/protectedRoute";
import Header from "../../components/header/header";
import StudentSideBar from "../students/studentsSideBar/studentsSideBar";
import LecturerSideBar from "../lecturers/lecturerSideBar/lecturerSideBar";
import OtherForms from "../../components/forms/OtherForms/OtherForms";
import Modal from "../../components/onSubmitModal/OnSubmitModal";
import PopUp from "../../components/pop/PopUp";
import { OuterWrapper } from "../../components/dashboardStyle/ResponsivenessStyle";
import { InnerWrapper } from "../../components/dashboardStyle/ResponsivenessStyle";
function ChangePasswordPage() {
  const location = useLocation();
  const { studentData, lecturerData } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const URL = location.pathname.startsWith("/students")
      ? "/students"
      : "/lecturers";

    // Check if new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm new password must match");
      return;
    }

    // API call to update password
    try {
      setShowPopup(true);
      const res = await axiosInstance.put(`/${URL}/dashboard/change-password`, {
        newPassword: newPassword,
      });

      if (res.status === 200) {
        if (res.data.passwordChangedSuccessfully) {
          setSuccess(true);
          setShowPopup(false);
          setOldPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        } else if (
          res.data.noTokenError ||
          res.data.verificationError ||
          res.data.error ||
          res.data.tokenExpiredError
        ) {
          setShowPopup(false);
          setError("unathorized kindly sign in again");
        } else if (res.data.unknownStudent) {
          setShowPopup(false);
          setError("Student not Found");
        }
      } else {
        setShowPopup(false);
        setError("Failed to update password");
      }
    } catch (error) {
      setShowPopup(false);
      setError("Internal Server Error");
    }
  };

  return (
    <OuterWrapper>
      {success && <PopUp message="Password changed successfuly" />}
      {showPopup && (
        <Modal modalText="Please wait while we process your request" />
      )}

      {location.pathname.startsWith("/students") ? (
        <StudentSideBar />
      ) : location.pathname.startsWith("/lecturers") ? (
        <LecturerSideBar />
      ) : null}
      <InnerWrapper>
        <Header
          newUser={
            (location.pathname.startsWith("/students")
              ? studentData?.firstName
              : `${lecturerData?.title} ${lecturerData?.firstName}`) as string
          }
        />
        <OtherForms
          formHeading="Change Password"
          buttonText="Change Password"
          error={error}
          handleSubmit={handleFormSubmit}
          disabled={!oldPassword || !newPassword || !confirmNewPassword}
          children={{
            formElement: (
              <>
                <div className="other-form-field">
                  <label htmlFor="old-password">Old Password</label>
                  <input
                    name="old-password"
                    type="password"
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="other-form-field">
                  <label htmlFor="new-password">New Password</label>
                  <input
                    name="new-password"
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="other-form-field">
                  <label htmlFor="confirm-new-password">
                    Confirm New Password
                  </label>
                  <input
                    name="confirm-new-password"
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
              </>
            ),
          }}
        />
      </InnerWrapper>
    </OuterWrapper>
  );
}

export default ChangePasswordPage;
