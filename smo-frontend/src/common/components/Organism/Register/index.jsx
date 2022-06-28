/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Title, Label, LabelContainer } from './styled';
import {
  TextField, 
  Button,
  MenuItem,
  Select 
} from '@mui/material';
import Card from '../../Molecules/Card'
import RadioButton from '../../Molecules/RadioButton';


const RegisterUser = () => {
  const [typeUser, setTypeUser] = useState('');
  const [age, setAge] = React.useState('');
  const courses = [
    {value: 1, course: 'Eng. Computação'}, 
    {value: 2, course: 'Direto' }, 
    {value: 3, course: 'Administração'}
  ]
  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Curso"
              variant="outlined"
              onChange={handleChange}
            >
              <MenuItem value={10}>Eng. Computação</MenuItem>
              <MenuItem value={20}>Administração</MenuItem>
              <MenuItem value={30}>Direito</MenuItem>
            </Select>
            <TextField 
              id="phoneNumber" 
              label="Matrícula" 
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