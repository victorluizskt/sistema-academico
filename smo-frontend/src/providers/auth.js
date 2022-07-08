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
    type: null
  })

  const [teacher, setTeacher] = useState({
    nomeProfessor: null,
    idProfessor: null,
    usuario: null,
    senha: null, 
    idDisciplina: null,
    nomeDisciplina: null,
    typeUser: null
  })

  return (
    <AuthContext.Provider value={{ user, typeUser, teacher, setUser, setTeacher, setTypeUserLogged }}>
      {props.children}
    </AuthContext.Provider>
  )
}

