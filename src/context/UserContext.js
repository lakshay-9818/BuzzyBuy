// this file will setup userId as a context that can be accessed by all the components
import { createContext, useState,useContext } from "react";

export const UserContext = createContext();
export const useValue =()=>{
    return useContext(UserContext);
}
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const handleIdChange = (id) => {
    setUserId(id);
  };
  return (
    <UserContext.Provider value={{ userId, handleIdChange }}>
      {children}
    </UserContext.Provider>
  );
};
