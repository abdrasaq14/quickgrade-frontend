export interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  matricNo: string;
  password: string;
  faculty: string;
  department: string;
}

export interface Lecturer {
  title: string;
  lecturerId: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeID: string;
  password: string;
  faculty: string;
  department: string;
  draftCourses: string[];
}
