import api from "../utils/api";

export default class Repository {
  checkUser = async (data) => {
    try {
      return await api.post("/login", data);
    } catch (error) {
      return error;
    }
  };

  registerUser = async (data) => {
    try {
      return await api.post("/student/registerStudent", data);
    } catch (error) {
      return error;
    }
  };

  // só student id
  getStudentTable = async (data) => {
    try {
      return await api.post("/student/getAllDisciplineStudent", data);
    } catch (error) {
      return error;
    }
  };
}
