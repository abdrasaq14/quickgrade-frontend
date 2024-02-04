import uploadlogo from "../../assets/upload_logo.png"
import "./GradeExamPageStyle.css"
function GradeTableRow(){
    return(
        <>
        <tr className="grade-exams-page-table-row">
                        <td className="grade-exams-page-table-cell">Chem 404</td>
                        <td className="grade-exams-page-table-cell">0/211</td>
                        <td className="grade-exams-page-table-cell">0/0</td>
                        <td className="grade-exams-page-table-cell">0/0</td>
                        <td className="grade-exams-page-table-cell">[Not Started]</td>
                        <td className="grade-exams-page-table-button-cell">
                            <form action="/INSERT-END-POINT" method="post" className="grade-exams-page-table-grade-form">
                                <button className="grade-exams-page-table-grade-button">Grade</button>
                            </form>
                        </td>
                        <td className="grade-exams-page-table-button-cell">
                            <form action="/INSERT-END-POINT" method="post" className="grade-exams-page-table-upload-form">
                                <button className="grade-exams-page-table-upload-button">
                                    <img src={uploadlogo} className="upload-icon"/><span>Upload</span>
                                </button>
                            </form>
                        </td>
                    </tr>
                    <br/>
        
        </>
    )
}

export default GradeTableRow