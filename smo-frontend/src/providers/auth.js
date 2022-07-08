import React, { useState } from 'react';

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {

  const [user, setUser] = useState({
    name: null, 
    password: null, 
    registration: null,
    course: null,
    typeUser: null,
    user: null
  })

  const [typeUser, setTypeUserLogged] = useState({
    type: 'professor'
  })

  const [teacher, setTeacher] = useState({
    NomeProfessor: null,
    IdProfessor: null,
    Usuario: null,
    Senha: null, 
    IdDisciplina: null,
    NomeDisciplina: null,
    typeUser: null
  })

  return (
    <AuthContext.Provider value={{ user, typeUser, teacher, setUser, setTeacher, setTypeUserLogged }}>
      {props.children}
    </AuthContext.Provider>
  )
}

