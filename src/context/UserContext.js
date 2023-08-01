// this file will setup userId as a context that can be accessed by all the components
import { createContext, useState,useContext, useEffect } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "firebase/auth";
import {auth} from '../firebaseInit';
import { toast} from "react-toastify";

export const UserContext = createContext();

export const useValue =()=>{
    return useContext(UserContext);
}

export const UserProvider = ({ children }) => {

  const [userId, setUserId] = useState('');  
  const [isUserLoading,setIsUserLoading]=useState(false);

  useEffect(()=>{ setIsUserLoading(true);
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUserId(user.uid)
      }
      else setUserId(null);
    })
    setIsUserLoading(false);
  },[]);  
  

  //firebase-method to register
const fMethodToRegister=(email,password)=>{
  createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  setUserId(user.uid)
  toast.success('Account created successfully'); 
})
.catch((error) => {
  toast.error(error.message);
  // ..
});
}

// firebase-method to sign in
const fMethodToLogin=(email,password)=>{
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...        
    setUserId(user.uid);  
    toast.success('User Logged In successfully');     
  })
  .catch((error) => {
    toast.error(error.message);
  });

}

//firebase-method to logout
const fMethodToLogout=()=>{
  auth.signOut();
  setUserId(null);
  toast.warning('Logged out');
}

  return (
    <UserContext.Provider
     value={{ userId,fMethodToRegister,isUserLoading,
     fMethodToLogin,fMethodToLogout}}>
      {children}
    </UserContext.Provider>
  );
};
