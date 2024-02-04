import "./GradeExamPageStyle.css"
interface GradeTableTitleProps{
    year: string;
    semester: string
}

function GradeTableTitle({year, semester}:GradeTableTitleProps){
    return(
        <>
         <div className="grade-exams-page-table-header-container">
                    <p className="grade-exams-page-table-title">{year}: {semester} Semester Examinations</p>
                    
                </div>
        </>
    )
}

export default GradeTableTitle