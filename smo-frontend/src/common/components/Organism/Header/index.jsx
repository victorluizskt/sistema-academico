/* eslint-disable no-unused-vars */
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { AuthContext } from "../../../../providers/auth";
import { useNavigate } from "react-router-dom";

const Header = ({ setSelectPage }) => {
  const { user, typeUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const {
    success,
    course,
    nameUser,
    passwordUser,
    registration,
    userName,
  } = user;

  const pagesStudent = ["Ver notas", "Matricular em uma Turma"];
  const pagesTeacher = ["Cadastrar notas", "Ver turma"];
  const returnTypeUser = () => {
    if (typeUser.type === "aluno") return pagesStudent;
    return pagesTeacher;
  };

  const handleCloseNavMenu = (e) => {
    switch (e.target.innerText) {
      case "VER NOTAS":
        setSelectPage("VER NOTAS");
        break;
      case "MATRICULAR EM UMA TURMA":
        setSelectPage("MATRICULAR EM UMA TURMA");
        break;
      case "CADASTRAR NOTAS":
        setSelectPage("CADASTRAR NOTAS");
        break;
      case "VER TURMA":
        setSelectPage("VER TURMA");
      break;
      default:
        setSelectPage("EMPTY");
        break;
    }
  };

  const pages = returnTypeUser();

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
