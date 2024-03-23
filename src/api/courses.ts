import axiosInstance from "../utils/axiosInstance";

export const fetchCoursesDetailBySemesterAndDepartment = async (semester: string, department: string) => { 
    try {
        const res = await axiosInstance.get(`/departments/get-courses-by-department-and-semester/?semester=${semester}&department=${department}`);
        return res.data.courses;
    } catch (error) {
        return error;
    }
}