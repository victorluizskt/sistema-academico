/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { CardContainer, 
  Label, Title, LabelContainer, SubTitle, Footer, ImagesLogin } from './styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Google from '../../../../assets/images/google.png'
import Facebook from '../../../../assets/images/facebook.png'

const Card = () => {
  return (
    <CardContainer>
      <Label>
        <Title>Bem vindo</Title>
        <SubTitle>Faça o login para continuar</SubTitle>
        <LabelContainer>
          <TextField id="login" label="Usuário" variant="outlined" />
          <TextField id="login" label="Senha" variant="outlined" type="password" />
          <Button variant="contained">Entrar</Button>
        </LabelContainer>
        <Footer>Cadastre-se</Footer>
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
    </CardContainer>
  )
}

export default Card;