import "./LecturerResults.css";
import "../lecturerDashboard/LecturerDashboard.css"
import "../../../assets/menu-board.png";
import LecturerSideBar from "../lecturerSideBar/lecturerSideBar";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
import Header from "../../../components/header/header";
import ResultsContents from "./ResultsContent/ResultsContents";
import ResultsTable from "./ResultsContent/Results/ResultsTable";

const LecturerResults = () => {
  const { lecturerData } = useAuth();
  return (
    <div>
     <LecturerSideBar />
      <Header newUser={`${lecturerData?.title} ${lecturerData?.firstName}`} />
      <ResultsContents />
      <ResultsTable />
    </div>
  );
};
export default LecturerResults;
