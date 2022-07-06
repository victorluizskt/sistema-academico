import React, { useContext } from "react";
import Header from "../../Organism/Header";
import StudentTable from "../../Organism/Table/TableContainerStudent";
import TeacherTable from "../../Organism/Table/TableContainerTeacher";

import { AuthContext } from "../../../../providers/auth";

const HomePage = () => {
  const { typeUser  } = useContext(AuthContext);
  console.log(typeUser)
  return (
    <>
      <Header />
      {typeUser.type === "aluno" ? <StudentTable /> : <TeacherTable />}
    </>
  );
};

export default HomePage;
