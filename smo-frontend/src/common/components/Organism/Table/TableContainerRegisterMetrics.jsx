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
  const [open, setOpen] = React.useState(false);

  const handleClick = async () => {
    // try {
    //   await repository.editStudent()
    //   return
    // } catch (error) {

    // }
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      const { data } = await repository.getAllStudents(teacher.IdProfessor);

      setStudentsData(data);
    })();
  }, [teacher.IdProfessor]);

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
        {setStudentsData?.map((obj) => (
          <tr>
            <td>{obj.nomeAluno}</td>
            <td>{obj.nomeCurso}</td>
            <td>{obj.nomeDisciplina}</td>
            <td>
              <TextField
                fullWidth
                // label="Standard"
                variant="standard"
                value={obj.notaAluno}
              />
            </td>
            <td>
              <TextField
                fullWidth
                // label="Standard"
                variant="standard"
                value={obj.frequenciaAluno}
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
                    // disabled={disciplina.disabled}
                    onClick={() => {
                      handleClick();
                      // obj.nomeAluno,
                      // obj.curso,
                      // obj.nota,
                      // obj.frequencia
                      // disciplina.idDisciplina,
                      // disciplina.idProfessor,
                      // disciplina.sala,
                      // index
                    }}
                  >
                    Matricular-se
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
