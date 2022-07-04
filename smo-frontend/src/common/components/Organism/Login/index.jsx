/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useState} from 'react';
import Repository from '../../../../repositories/repository'
import {
  TextField, 
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Google from '../../../../assets/images/google.png'
import Facebook from '../../../../assets/images/facebook.png'
import { 
  Label, 
  Title, 
  LabelContainer, 
  SubTitle, 
  ImagesLogin 
} from './styled';
import Card from '../../Molecules/Card'
import RadioButton from '../../Molecules/RadioButton';
import { AuthContext } from '../../../../providers/auth'

const repository = new Repository();

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = React.useContext(AuthContext); 
  const [logged, setLogged] = useState(false); 
  const [typeUserLogged, setTypeUser] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeLogin = (event) => {
    setLogin(event.target.value)
  }
  
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const signIn = async () => {
    setLogged(true);

    const request = {
      'teacherOrStudent': typeUserLogged,
      'password': password,
      'userName': login
    }

    const { data: {
      success, 
      course, 
      nameUser, 
      passwordUser, 
      registration, 
      typeUser, 
      userName
      }
    }  = await repository.checkUser(request);

    setUser({
      name: nameUser, 
      password: passwordUser, 
      registration:registration,
      course: course,
      typeUser: typeUser,
      user: userName
    })

    if(success) return navigate('/home');
    setLogged(!success)
  }

  return (
    <Card width="275px" height="450px">
      <Label>
          <Title>Bem vindo</Title>
          <SubTitle>Faça o login para continuar</SubTitle>
          <RadioButton setTypeUser={setTypeUser} margin='43px' />
          <LabelContainer>
            <TextField id="login" onChange={handleChangeLogin} label="Usuário" variant="outlined" />
            <TextField id="login" onChange={handleChangePassword} label="Senha" variant="outlined" type="password" />
            <Button disabled={logged} onClick={() => signIn()} variant="contained">Entrar</Button>
          </LabelContainer>
          <Button 
            onClick={() => navigate('/register')} 
            variant="text"
            size="small">
              Cadastre-se
          </Button>
          <ImagesLogin>
            <img 
              src={Google} 
              alt="Google image" 
              width="20" 
              height="20"
              style={{cursor: 'pointer'}}
            />
            <img 
              src={Facebook} 
              alt="Facebook image" width="20" height="20" 
              style={{marginLeft: '10px', cursor: 'pointer'}}
            />
          </ImagesLogin>
        </Label>
      </Card>
  )
}

export default Login;