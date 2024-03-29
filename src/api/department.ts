import axiosInstance from "../utils/axiosInstance";

export const fetchDepartmentByFaculty = async (faculty: string) => {
    const res = await axiosInstance.get(`/departments/get-departments-by-faculty/?faculty=${faculty}`);
    if (res.data.departments) {
            return res.data.departments;
        }
}

export const fetchFacultyAndDepartment = async () => { 
    const res = await axiosInstance.get("/get-faculty-and-departments");
    if (res.data.facultyAndDepartments) {
        return res.data.facultyAndDepartments;
    }
}