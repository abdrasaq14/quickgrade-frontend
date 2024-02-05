import "./GradeExamPageStyle.css"
interface GradeTableTitleProps{
    year?: string
    semester: string
}

function GradeTableTitle({year ="2023/2024", semester}:GradeTableTitleProps){
    return(
        <>
         <div className="grade-exams-page-table-header-container">
                    <p className="grade-exams-page-table-title">{year}: {semester} Semester Examinations</p>
                    
                </div>
        </>
    )
}

export default GradeTableTitle