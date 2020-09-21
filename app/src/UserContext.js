import React from 'react'

export const UserContext = React.createContext({
    isLogged: false,
  });


//export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

export default UserContext