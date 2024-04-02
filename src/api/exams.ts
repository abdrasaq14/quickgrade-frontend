import axiosInstance from "../utils/axiosInstance";

export const fetchExamTimeTable = async () => {
      const res = await axiosInstance.get("/lecturers/dashboard");

  if (res.data.examsTotal) {
          return res.data.examsTotal;
        }
    };
export const fetchDraftExamDetail = async (lecturerId:string, courseCode: string) => {
  const res = await axiosInstance.get(`/lecturers/fetch-draft-exams/?lecturerId=${lecturerId}&courseCode=${courseCode}`)
  if (res.data.draftExamDetail || res.data.draftQuestions) {
    return res.data
 }  
}

