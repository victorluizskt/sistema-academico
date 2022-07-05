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
import Repository from '../../../../repositories/repository'
import RadioButton from '../../Molecules/RadioButton';
import { useNavigate } from 'react-router-dom';

const repository = new Repository();

const RegisterUser = () => {
  const navigate = useNavigate();
  const [typeUser, setTypeUser] = useState('');
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [idCourse, setIdCourse] = useState('');
  const [registration, setRegistration] = useState('');
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    setIdCourse(event.target.value)
  };

  const register = async () => {
    if(typeUser === 'aluno'){
      const request = {
        userName: userName,
        name: name,
        password: password,
        idCourse: idCourse,
        registration: registration
      }
      const { data } = await repository.registerUser(request);
      if(data) navigate('/login')
    }

    if(typeUser === 'professor'){
      const request = {
        userName: userName,
        name: name,
        password: password,
        idCourse: idCourse,
        registration: registration
      }
    }
  }

  return (
    <Card width="275px" height="560px">
      <Label>
        <Title>Vamos começar?</Title>
        <RadioButton setTypeUser={setTypeUser} margin='35px'/>
        <LabelContainer>
            <TextField 
              id="login" 
              label="Usuário" 
              variant="outlined" 
              onChange={(event) => setUserName(event.target.value)}
            />
            <TextField 
              id="login" 
              label="Nome" 
              variant="outlined" 
              onChange={(event) => setName( event.target.value)}
            />
            <TextField 
              id="password" 
              label="Senha" 
              variant="outlined" 
              type="password" 
              onChange={(event) => setPassword(event.target.value)}
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Curso"
              variant="outlined"
              onChange={handleChange}
            >
              <MenuItem value={2}>Psicologia</MenuItem>
              <MenuItem value={1}>Administração</MenuItem>
              <MenuItem value={3}>Enfermagem</MenuItem>
            </Select>
            <TextField 
              id="phoneNumber" 
              label="Matrícula" 
              variant="outlined" 
              type="phoneNumber"
              onChange = {(event) => setRegistration(event.target.value)}
            />
            <Button onClick={register} variant="contained">Cadastrar</Button>
        </LabelContainer>
      </Label>
    </Card>
  )
}

export default RegisterUser;