import api from "../utils/api";

export default class Repository {
  checkUser = async (data) => {
    try {
      return await api.post("/login", data);
    } catch (error) {
      console.log(error);
    }
  };

  registerUser = async (data) => {
    try {
      return await api.post("/student/registerStudent", data);
    } catch (error) {
      console.log(error);
    }
  };

  // só student id
  getStudentTable = async (data) => {
    try {
      return await api.post("/student/getAllDisciplineStudent", data);
    } catch (error) {
      console.log(error);
    }
  };

  getTableMatriculaAluno = async (data) => {
    try {
      return await api.post("/student/getAllDiscipline", data);
    } catch (error) {
      console.log(error);
    }
  };
}
