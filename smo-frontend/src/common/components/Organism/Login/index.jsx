/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useState} from 'react';
import {
  TextField, 
  RadioGroup, 
  FormControlLabel, 
  Button,
  Radio,
  FormControl 
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

const Login = () => {
  const navigate = useNavigate();
  const [typeUser, setTypeUser] = useState('');
  
  return (
    <Card>
      <Label>
          <Title>Bem vindo</Title>
          <SubTitle>Faça o login para continuar</SubTitle>
          <FormControl style={{ marginLeft: '30px'}}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel 
                value="professor" 
                control={<Radio />} 
                label="Professor"
                onChange={() => setTypeUser('professor')}
              />
              <FormControlLabel
                value="aluno"
                control={<Radio />}
                label="Aluno"
                onChange={() => setTypeUser('aluno')}
              />
            </RadioGroup>
        </FormControl>
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