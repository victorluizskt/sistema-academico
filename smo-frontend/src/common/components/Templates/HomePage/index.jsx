import React, { useContext, useState } from "react";
import Header from "../../Organism/Header";
import StudentTable from "../../Organism/Table/TableContainerStudent";
import TeacherTable from "../../Organism/Table/TableContainerTeacher";

import { AuthContext } from "../../../../providers/auth";

const HomePage = () => {
  // const { typeUser  } = useContext(AuthContext);
  const [selectPage, setSelectPage] = useState('');

  const selectRender = () => {
    switch (selectPage) {
      case "VER NOTAS":
        return <StudentTable />;

      case "MATRICULAR EM UMA TURMA":
        return ;
      // case "CADASTRAR NOTAS":
      //   setSelectPage("CADASTRAR NOTAS");
      // default:
      //   setSelectPage("VER TURMA");
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
