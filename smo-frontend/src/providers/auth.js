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

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

