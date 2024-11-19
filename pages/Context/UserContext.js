import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '', // Example placeholder for the name
    profilePicture: '', // Default profile picture is an empty string
  });

  // You can set the user data including the profile picture URL
  const setUserData = (userData) => {
    setUser({
      name: userData.name,
      profilePicture: userData.profilePicture, // Example: 'https://example.com/path/to/profile.jpg'
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
