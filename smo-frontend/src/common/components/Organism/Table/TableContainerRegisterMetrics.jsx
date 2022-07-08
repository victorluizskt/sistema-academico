/* eslint-disable no-unused-vars */
import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../providers/auth";
import Repository from "../../../../repositories/repository";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

export default function TableContainerRegisterMetrics() {
  const [studentsData, setStudentsData] = useState([]);
  const { teacher } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ notaAluno: "", frequenciaAluno: "" });

  const handleClick = async (
    studentId,
    idDisciplina,
    notaAluno,
    frequenciaAluno
  ) => {
    var request = {
      studentId: studentId,
      idDisciplina: idDisciplina,
      notaAluno: notaAluno,
      frequenciaAluno: frequenciaAluno,
    };

    try {
      const { data } = await repository.editStudent(request);
      console.log(data);
      setOpen(data.success);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    (async () => {
      const request = {
        professorId: teacher.idProfessor,
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
          <th>Nome Disciplina</th>
          <th style={{ width: 70 }}>Nota</th>
          <th style={{ width: 60 }}>Frequência</th>
          <th></th>
        </tr>
        {studentsData?.map((obj) => (
          <tr>
            <td>{obj.nomeAluno}</td>
            <td>{obj.nomeCurso}</td>
            <td>{obj.nomeDisciplina}</td>
            <td>
              <TextField
                fullWidth
                variant="standard"
                name="notaAluno"
                value={obj.notaAluno}
                onChange={(e) => handleOnChange(e)}
              />
            </td>
            <td>
              <TextField
                fullWidth
                variant="standard"
                name="frequenciaAluno"
                value={obj.frequenciaAluno}
                onChange={(e) => handleOnChange(e)}
              />
            </td>
            <td>
              <ThemeProvider theme={theme}>
                <Grid container style={{ alignItems: "center" }}>
                  <Button
                    variant="contained"
                    style={{
                      marginLeft: 10,
                    }}
                    onClick={() => {
                      handleClick(
                        obj.matriculaAluno,
                        obj.idDisciplina,
                        obj.notaAluno,
                        obj.frequenciaAluno
                      );
                    }}
                  >
                    Editar
                  </Button>
                </Grid>
              </ThemeProvider>
            </td>
          </tr>
        ))}
      </table>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}
