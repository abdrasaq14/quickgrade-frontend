import { Course } from "../interfaces/courses";
import axiosInstance from "../utils/axiosInstance";

export const fetchCoursesDetailBySemesterAndDepartment = async (semester: string, department: string) => { 
    try {
        const res = await axiosInstance.get(`/departments/get-courses-by-department-and-semester/?semester=${semester}&department=${department}`);
        return res.data.courses;
    } catch (error) {
        return error;
    }
}

export const fetchAllFaculty = async (): Promise<Course[] | undefined> => {
    try {
        const res = await axiosInstance.get("/get-courses");
        if (res.data.courseDetailFromServer) {
            return res.data.courseDetailFromServer;
        }
        
    } catch (error) {
        {/** */}
    }
    
}

