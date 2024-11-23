import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '', 
    profilePicture: '', 
  });

  const setUserData = (userData) => {
    setUser({
      name: userData.name,
      profilePicture: userData.profilePicture, 
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserProvider;
