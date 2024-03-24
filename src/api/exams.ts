import axiosInstance from "../utils/axiosInstance";

export const fetchExamTimeTable = async () => {
      const res = await axiosInstance.get("/lecturers/dashboard");

        if (res.data.examsTotal) {
          return res.data.examsTotal;
        }
    };


