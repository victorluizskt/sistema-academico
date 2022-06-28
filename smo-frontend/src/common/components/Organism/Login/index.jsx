/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useState} from 'react';
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

const Login = () => {
  const navigate = useNavigate();
  const [typeUser, setTypeUser] = useState('');
  console.log(typeUser)

  return (
    <Card width="275px" height="450px">
      <Label>
          <Title>Bem vindo</Title>
          <SubTitle>Faça o login para continuar</SubTitle>
          <RadioButton setTypeUser={setTypeUser} margin='43px' />
          <LabelContainer>
            <TextField id="login" label="Usuário" variant="outlined" />
            <TextField id="login" label="Senha" variant="outlined" type="password" />
            <Button variant="contained">Entrar</Button>
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