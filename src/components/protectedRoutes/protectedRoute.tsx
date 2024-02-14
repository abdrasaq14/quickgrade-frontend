/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
interface ProtectedRouteProps {
  children: ReactNode;
}
interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  matricNo: string;
  password: string;
  faculty: string;
  department: string;
}
interface Lecturer {
  title: string;
  lecturerId: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeID: string;
  password: string;
  faculty: string;
  department: string;
}

interface AuthContextProps {
  studentData?: Student;
  lecturerData?: Lecturer;
}
const AuthContext = createContext<AuthContextProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};
export function StudentProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<Student>();

  useEffect(() => {
    async function checkToken() {
      const auth = await axiosInstance.get("/protected-routes/students");
      if (
        auth.status === 200 &&
        (auth.data.noTokenError ||
          auth.data.tokenExpiredError ||
          auth.data.verificationError)
      ) {
        navigate("/students/signin");
      } else if (auth.status === 200 && auth.data.student) {
        setStudentData(auth.data.student);
      }
    }
    checkToken();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // check if the token is present and verify it frorm the backend
  const contextValue: AuthContextProps = {
    studentData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <>{children}</>
    </AuthContext.Provider>
  );
}
export function LecturerProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [lecturerData, setLecturerData] = useState<Lecturer>();

  useEffect(() => {
    async function checkToken() {
      const auth = await axiosInstance.get("/protected-routes/lecturers");
      if (
        auth.status === 200 &&
        (auth.data.noTokenError ||
          auth.data.tokenExpiredError ||
          auth.data.verificationError)
      ) {
        navigate("/lecturers/signin");
      } else if (auth.status === 200 && auth.data.lecturer) {
        setLecturerData(auth.data.lecturer);
      }
    }
    checkToken();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // check if the token is present and verify it frorm the backend
  const contextValue: AuthContextProps = {
    lecturerData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <>{children}</>
    </AuthContext.Provider>
  );
}
