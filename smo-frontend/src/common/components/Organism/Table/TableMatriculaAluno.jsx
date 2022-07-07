import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../providers/auth";
import Repository from "../../../../repositories/repository";
import Button from "@mui/material/Button";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const repository = new Repository();

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "2px 14px",
        },
      },
    },
  },
});

export default function TableMatriculaAluno() {
  const [studentData, setStudentData] = useState([]);
  const { user } = useContext(AuthContext);

  const handleClick = async (idDisciplina, idProfessor, sala, index) => {
    let aux = studentData;
    aux[index].disabled = true;

    setStudentData(aux);

    const obj = {
      MatriculaAluno: user.registration,
      TurmaAluno: sala,
      IdProfessor: idProfessor,
      IdDisciplina: idDisciplina,
    };

    await repository.addStudent(obj);
  };

  useEffect(() => {
    (async () => {
      const request = {
        MatriculaAluno: user.registration,
      };

      const { data } = await repository.getTableMatriculaAluno(request);
      data.map((obj) => ({
        ...obj,
        disabled: false,
      }));
      setStudentData(data);
    })();
  }, [user.registration]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <table>
        <tr>
          <th>Nome Disciplina</th>
          <th>CargaHoraria</th>
          <th>Sala</th>
          <th>Professor</th>
          <th>Horario</th>
          <th>QuantidadeMaximaAluno</th>
        </tr>
        {studentData?.map((disciplina, index) => (
          <tr>
            <td>{disciplina.nomeDisciplina}</td>
            <td>{disciplina.cargaHoraria}</td>
            <td>{disciplina.sala}</td>
            <td>{disciplina.professor}</td>
            <td>{disciplina.horario}</td>
            <td>{disciplina.quantidadeMaximaAluno}</td>

            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                disabled={disciplina.disabled}
                onClick={() => {
                  handleClick(
                    disciplina.idDisciplina,
                    disciplina.idProfessor,
                    disciplina.sala,
                    index
                  );
                }}
              >
                Matricular-se
              </Button>
            </ThemeProvider>
          </tr>
        ))}
      </table>
    </div>
  );
}
