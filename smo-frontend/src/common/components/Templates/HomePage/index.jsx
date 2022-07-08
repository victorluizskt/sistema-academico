import React, { useContext, useState } from "react";
import Header from "../../Organism/Header";
import StudentTable from "../../Organism/Table/TableContainerStudent";
import TableMatriculaAluno from "../../Organism/Table/TableMatriculaAluno";
import TeacherTable from "../../Organism/Table/TableContainerTeacher";
import EmptyState from "../../Organism/EmptyState"
import TableContainerRegisterMetrics from '../../Organism/Table/TableContainerRegisterMetrics'

import { AuthContext } from "../../../../providers/auth";

const HomePage = () => {
  const { typeUser  } = useContext(AuthContext);
  const [selectPage, setSelectPage] = useState('');
  console.log(typeUser)
  const selectRender = () => {
    switch (selectPage) {
      case "VER NOTAS":
        return <StudentTable />;
      case "MATRICULAR EM UMA TURMA":
        return <TableMatriculaAluno />;
      case "VER TURMA":
        return <TeacherTable />;
      case "CADASTRAR NOTAS":
        return <TableContainerRegisterMetrics />;
      default:
        return <EmptyState/>;
    }
  };
  return (
    <>
      <Header setSelectPage={setSelectPage} />
      {selectRender()}
      {/* {typeUser.type === "aluno" ? <StudentTable /> : <TeacherTable />} */}
    </>
  );
};

export default HomePage;
