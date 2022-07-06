/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from "../../../../providers/auth";

const Header = () => {
  const { user, typeUser } = React.useContext(AuthContext);
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
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const returnTypeUser = () => {
    if (typeUser.type === "aluno") return pagesStudent;
    return pagesTeacher;
  };

  const handleCloseNavMenu = () => {
    // setAnchorElNav(null);
  };

  console.log(user);

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
