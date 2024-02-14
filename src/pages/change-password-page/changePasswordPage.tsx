import "./changePasswordPage.css";
import SideBar from "../../components/sidebar/sideBar";
import { Link, useLocation } from "react-router-dom";
import { FormEvent } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import MainButton from "../../components/buttons/mainButton";
import { useAuth } from "../../components/protectedRoutes/protectedRoute";
import Header from "../../components/header/header";

function ChangePasswordPage() {
  const location = useLocation();
  const { studentData, lecturerData } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const URL = location.pathname.startsWith("/students")
      ? "/students"
      : "/lecturers";

    // Validate the form fields
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError("All fields are required, try again");
      return;
    }

    // Check if new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm new password must match");
      return;
    }

    // API call to update password
    try {
      const res = await axiosInstance.put(`/${URL}/dashboard/change-password`, {
        newPassword: newPassword,
      });

      if (res.status === 200) {
        if (res.data.passwordChangedSuccessfully) {
          setSuccessMessage("Password updated successfully");
          setOldPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        } else if (
          res.data.noTokenError ||
          res.data.verificationError ||
          res.data.error ||
          res.data.tokenExpiredError
        ) {
          setError("unathorized kindly sign in again");
        } else if (res.data.unknownStudent) {
          setError("Student not Found");
        }
      } else {
        setError("Failed to update password");
      }
    } catch (error) {
      setError("Internal Server Error");
    }
  };

  return (
    <>
      <div className="change-password-container">
        {location.pathname.startsWith("/students") ? (
          <SideBar>
            {{
              sidebarElement: (
                <>
                  <div className="feature-2">
                    <img
                      className="img-feat"
                      src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-menu.svg"
                    />
                    <Link to="/students/dashboard" className="text-wrapper-6">
                      Dashboard
                    </Link>
                  </div>
                  <div className="feature-2">
                    <img
                      className="img-2"
                      src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-book-square.svg"
                    />
                    <Link
                      to="/students/dashboard/enrolled-courses"
                      className="text-wrapper-6"
                    >
                      Enrolled Courses
                    </Link>
                  </div>
                  <div className="feature-2">
                    <img
                      className="img-2"
                      src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                    />
                    <Link
                      to="/students/dashboard/results"
                      className="text-wrapper-6"
                    >
                      Results
                    </Link>
                  </div>
                </>
              ),
            }}
          </SideBar>
        ) : location.pathname.startsWith("/lecturers") ? (
          <SideBar>
            {{
              sidebarElement: (
                <>
                  <div className="feature-2">
                    <img
                      className="img-feat"
                      src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-menu.svg"
                    />
                    <Link to="/lecturers/dashboard" className="text-wrapper-6">
                      Dashboard
                    </Link>
                  </div>

                  <div className="feature-2">
                    <img
                      className="img-2"
                      src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                    />

                    <Link
                      to="/lecturers/dashboard/set-exams"
                      className="text-wrapper-6"
                    >
                      Set Exams
                    </Link>
                  </div>
                  <div className="feature-2">
                    <img
                      className="img-2"
                      src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                    />
                    <Link
                      to="/lecturers/dashboard/grade-exams"
                      className="text-wrapper-6"
                    >
                      Grade Exams
                    </Link>
                  </div>
                  <div className="feature-2">
                    <img
                      className="img-2"
                      src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-refresh-square-2.svg"
                    />
                    <Link
                      to="/lecturers/dashboard/results"
                      className="text-wrapper-6"
                    >
                      Results
                    </Link>
                  </div>
                </>
              ),
            }}
          </SideBar>
        ) : null}
        <div className="change-password-body">
          <Header
            newUser={
              (location.pathname.startsWith("/students")
                ? studentData?.firstName
                : lecturerData?.firstName) as string
            }
          />
          <div className="change-password-form">
            <h3>Change Password</h3>

            <form onSubmit={handleFormSubmit}>
              {error && <div className="error-message">{error}</div>}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}

              <div className="change-password-inner-form">
                <div>
                  <label htmlFor="old-password">Old Password</label>
                  <input
                    name="old-password"
                    type="password"
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="new-password">New Password</label>
                  <input
                    name="new-password"
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div>
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
              </div>

              <MainButton button_text="Change Password" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePasswordPage;
