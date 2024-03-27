import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  lecturerId: "",
  firstName: "",
  lastName: "",
  email: "",
  employeeID: "",
  password: "",
  faculty: "",
  department: "",
  draftCourses: [],
};

const lecturerSlice = createSlice({
  name: "lecturer",
  initialState,
  reducers: {
    setLecturer: (state, action) => {
      return Object.assign(state, action.payload);
    },
  },
});

export const { setLecturer } = lecturerSlice.actions;
export default lecturerSlice.reducer;
