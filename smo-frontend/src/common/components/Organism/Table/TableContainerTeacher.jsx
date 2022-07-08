/* eslint-disable no-unused-vars */
import * as React from "react";

import Repository from "../../../../repositories/repository";


const repository = new Repository();

export default function TableContainerStudent() {

  return (
    <div style={{ height: 400, width: "100%" }}>
      <table>
        <tr>
          <th>Nome Aluno</th>
          <th>Curso</th>
          <th>Disciplina</th>
          <th>Horario</th>
          <th>Frequencia</th>
        </tr>
        {/* {studentData?.map((disciplina, index) => (
          <tr>
            <td>{disciplina.nomeDisciplina}</td>
            <td>{disciplina.cargaHoraria}</td>
            <td>{disciplina.sala}</td>
            <td>{disciplina.professor}</td>
            <td>{disciplina.horario}</td>
            <td>{disciplina.quantidadeMaximaAluno}</td>
          </tr>
        ))} */}
      </table>
    </div>
  );
}
