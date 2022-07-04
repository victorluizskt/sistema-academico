/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../../../../providers/auth'

const Header = () => {
  const { user } = React.useContext(AuthContext); 
  const {
    success, 
    course, 
    nameUser, 
    passwordUser, 
    registration, 
    typeUser, 
    userName
  } = user;

  const pagesStudent = ['Ver notas', 'Ver perfil'];
  const pagesTeacher = ['Cadastrar notas', 'Ver turma'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const returnTypeUser = () => {
    if(typeUser === 'aluno') return pagesStudent;
    return pagesTeacher;
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  console.log(user);

  const pages = returnTypeUser();

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
      </Container>
    </AppBar>
    </>
  )
}

export default Header;