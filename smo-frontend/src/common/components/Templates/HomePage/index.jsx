import React, { useContext } from "react";
import Header from "../../Organism/Header";
import StudentTable from "../../Organism/Table/TableContainerStudent";
import TeacherTable from "../../Organism/Table/TableContainerStudent";

import { AuthContext } from "../../../../providers/auth";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Header />
      {user.typeUser === "aluno" ? <StudentTable /> : <TeacherTable />}
    </>
  );
};

export default HomePage;
