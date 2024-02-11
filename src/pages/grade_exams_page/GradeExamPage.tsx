import { useState } from "react";
import SideBar from "../../components/sidebar/sideBar";
import Header from "../../components/header/header";
import { Link } from "react-router-dom";
import "./GradeExamPageStyle.css"
import TableTitle from "./GradeTableTitle";
import GradeTable from "./GradeTable";





function GradeExamPage() {
 const years = ["2022/2023", "2021/2022", "2020/2021", "2019/2020", "2018/2019"]
 const [sessionYear, setSessionYear] = useState("")

 return (
   <div>
     {/* Sidebar */}
     <SideBar>
        {{
          sidebarElement: (
            <>
              <div className="feature-2">
                <img
                  className="img-feat"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-menu.svg"
                />
                <Link to="/" className="text-wrapper-6">
                  Dashboard
                </Link>
              </div>
              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-book-square.svg"
                />
                <Link to="/" className="text-wrapper-6">
                  Courses
                </Link>
              </div>
              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                />
                <Link to="/" className="text-wrapper-6">
                  Set Exams
                </Link>
              </div>
              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                />
                <Link to="/" className="text-wrapper-6">
                  Grade Exams
                </Link>
              </div>
              <div className="feature-2">
                <img className="img-2" src="./img/refresh-square-2.png" />
                <Link to="/" className="text-wrapper-6">
                  Results
                </Link>
              </div>
            </>
          ),
        }}
      </SideBar>
      <Header newUser="Keni"/>

      <main className="gade-exams-page-main-section">
       
           <div className="grade-exams-page-main-section-title-container">
               <h1 className="grade-exams-page-main-section-title">GRADE EXAMS</h1>
               <form className="grade-exams-page-top-session-form" action="#" method="post">
                   <label className="grade-exams-page-top-session-form-label" htmlFor="sessionYearInput">Sort by Session:</label>
                   <select name="sessionYear" id="sessionYearInput" className="grade-exams-page-top-session-form-inputs"
                   onChange={(event)=>{ return setSessionYear(event.target.value)}}>
                    {years.map((year)=>{
                        return(
                            <option key={year} value={year}>{year}</option>
                        )
                    })}
                   </select>
               </form>
           </div>
           
           <div className="grade-exams-page-table-title-and-contents">

           <TableTitle year={sessionYear} semester="First"/>
       
               <div className="grade-exams-page-table-container">
                <GradeTable/>
                   
                   {/* <table className="grade-exams-page-table-contents">
                   <TableHeadings/>
                   <TableRow/>
                   </table> */}
               </div>

           </div>
           <div className="grade-exams-page-table-title-and-contents">

           <TableTitle year={sessionYear} semester="Second"/>
       
               <div className="grade-exams-page-table-container">
                <GradeTable/>
                   
                   {/* <table className="grade-exams-page-table-contents">
                   <TableHeadings/>
                   <TableRow/>
                   </table> */}
               </div>

           </div>
       </main>
   </div>
   
 );
}

export default GradeExamPage;

//  <div className="hiddenfunction">{increaseCount()}</div>
// <div className="hiddenfunction">{increaseCount()}</div>