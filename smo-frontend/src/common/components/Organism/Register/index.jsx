/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Title, Label, LabelContainer } from './styled';
import {
  TextField, 
  Button,
} from '@mui/material';
import Card from '../../Molecules/Card'
import RadioButton from '../../Molecules/RadioButton';


const RegisterUser = () => {
  const [typeUser, setTypeUser] = useState('');

  return (
    <Card width="275px" height="500px">
      <Label>
        <Title>Vamos começar?</Title>
        <RadioButton setTypeUser={setTypeUser} margin='35px'/>
        <LabelContainer>
            <TextField 
              id="login" 
              label="Usuário" 
              variant="outlined" 
            />
            <TextField 
              id="password" 
              label="Senha" 
              variant="outlined" 
              type="password" 
            />
            <TextField 
              id="repeatPassword" 
              label="Repetir senha" 
              variant="outlined" 
              type="password" 
            />
            <TextField 
              id="phoneNumber" 
              label="Telefone" 
              variant="outlined" 
              type="phoneNumber" 
            />
            <Button variant="contained">Cadastrar</Button>
        </LabelContainer>
      </Label>
    </Card>
  )
}

export default RegisterUser;