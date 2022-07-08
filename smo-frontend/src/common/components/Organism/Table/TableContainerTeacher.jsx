/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../providers/auth";
import Repository from "../../../../repositories/repository";


const repository = new Repository();

export default function TableContainerStudent() {
  const [studentsData, setStudentsData] = useState([]);
  const { teacher } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const request = {
        'professorId': teacher.idProfessor
      };
      const { data } = await repository.getAllStudents(request);
      setStudentsData(data);
    })();
  }, [teacher.idProfessor]);

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
        {studentsData?.map((obj) => (
          <tr>
            <td>{obj.nomeAluno}</td>
            <td>{obj.nomeCurso}</td>
            <td>{obj.nomeDisciplina}</td>
            <td>{obj.horario}</td>
            <td>{obj.frequenciaAluno}%</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
