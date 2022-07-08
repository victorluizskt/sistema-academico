import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../providers/auth";
import Repository from "../../../../repositories/repository";
import Button from "@mui/material/Button";
import "./index.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TableMatriculaAluno() {
  const [studentData, setStudentData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleClick = async (idDisciplina, idProfessor, sala, index) => {
    const request = {
      'MatriculaAluno': user.registration,
      'TurmaAluno': sala,
      'IdProfessor': idProfessor,
      'IdDisciplina': idDisciplina
    };

    await repository.addStudent(request);
    setOpen(true);
    let aux = studentData;
    aux[index].disabled = true;

    setStudentData(aux);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      const request = {
        MatriculaAluno: user.registration,
      };

      const { data } = await repository.getTableMatriculaAluno(request);
      data.map((obj) => ({
        ...obj,
        disabled: true,
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Matriculado na disciplina com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
}
