import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../providers/auth";
import Repository from "../../../../repositories/repository";
import Button from "@mui/material/Button";
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const repository = new Repository();

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '2px 14px',
        },
      },
    },
  },
});

export default function TableMatriculaAluno() {
  const [studentData, setStudentData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const request = {
        MatriculaAluno: user.registration,
      };

      const { data } = await repository.getTableMatriculaAluno(request);
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
        {studentData?.map(disciplina => (   
         <tr>
            <td>{disciplina.nomeDisciplina}</td>
            <td>{disciplina.cargaHoraria}</td>
            <td>{disciplina.sala}</td>
            <td>{disciplina.professor}</td>
            <td>{disciplina.horario}</td>
            <td>{disciplina.quantidadeMaximaAluno}</td>
            <ThemeProvider theme={theme}>
              <Button variant="contained">Matricular-se</Button>
            </ThemeProvider>
          </tr>
        ))}
      </table>
    </div>
  );
}
