import React, { createContext, useState, useContext } from 'react';

// Create a context for the user
const UserContext = createContext();

// Create a provider component that wraps the children
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// A custom hook to use the user context
export const useUser = () => useContext(UserContext);
