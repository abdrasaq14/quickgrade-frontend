import "./GradeExamPageStyle.css"
import uploadlogo from "../../assets/upload_logo.png"
import { useState } from "react";


const GradeTable = () => {
     
    interface LecturerCoursesToGrade{
        courseCode: string;
        submissions: string;
        graded: string;
        notGraded: string;
        examStatus: "Not Started"|"Ongoing"|"Complete"
    }

    const coursesToGrade:LecturerCoursesToGrade[] = [
        {
        courseCode: "CHEM404",
        submissions: `0/211`,
        graded: `0/0`,
        notGraded: `0/0`,
        examStatus: "Not Started"
        },
        {
        courseCode: "CHEM211",
        submissions: `200/345`,
        graded: `0/200`,
        notGraded: `200/200`,
        examStatus: "Ongoing"
        },
        {
        courseCode: "CE522",
        submissions: `210/211`,
        graded: `109/210`,
        notGraded: `101/210`,
        examStatus: "Complete"
        }
    ] 

    const [examStatusColour, setExamStatusColour] = useState("grey")
    

    
    const determineColour = (content:unknown)=>{
       let colour;
        if (content=="Not Started") colour = "grey";
        if (content=="Ongoing")colour = "orange";
        if (content=="Complete") colour = "green";
        return colour

    }

    const handleExamStatus = (examStatus:string)=>{
        if(examStatus== "Not Started") setExamStatusColour("grey")
        if(examStatus== "Ongoing") setExamStatusColour("orange")
        if(examStatus== "Complete") setExamStatusColour("green")

    }


  return (
    <div>
        <table className="grade-exams-page-table-contents">
            
            <tr className="grade-exams-page-table-header-row">
                            <th className="grade-exams-page-table-header">Course Code</th>
                            <th className="grade-exams-page-table-header">Submissions</th>
                            <th className="grade-exams-page-table-header">Graded</th>
                            <th className="grade-exams-page-table-header">Not Graded</th>
                            <th className="grade-exams-page-table-header">Exam Status</th>     
                          </tr> 
            
            
            {coursesToGrade.map((course)=>{
                return(
                   <>
                   <br/>
                     <tr className="grade-exams-page-table-row">
                        <td className="grade-exams-page-table-cell-coursecode" key="courseCode">{course.courseCode}</td>
                        <td className="grade-exams-page-table-cell-submissions" key="submissions">{course.submissions}</td>
                        <td className="grade-exams-page-table-cell-graded" key="graded" >{course.graded}</td>
                        <td className="grade-exams-page-table-cell-not-graded" key="notGraded" >{course.notGraded}</td>
                        <td className="grade-exams-page-table-cell-exam-status" key="examStatus" style={{color:determineColour(course.examStatus), backgroundColor: examStatusColour}} onChange={()=>handleExamStatus(course.examStatus)}>{course.examStatus}</td>
                        <td className="grade-exams-page-table-button-cell" key="gradeButton">
                                <button className="grade-exams-page-table-grade-button">Grade</button>
                            
                        </td>
                        <td className="grade-exams-page-table-button-cell" key="uploadButton">
                            
                                <button className="grade-exams-page-table-upload-button">
                                    <img src={uploadlogo} className="upload-icon"/><span>Upload</span>
                                </button>
                        </td>
                       
                    </tr> 
                    
                    </>
                    
                   
                
                )
            })}
         
            
        </table>
    </div>
  )
}

export default GradeTable