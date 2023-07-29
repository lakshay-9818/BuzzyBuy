import "./styles.css";
import {
  createBrowserRouter,
RouterProvider,
Navigate
} from "react-router-dom";
import {useEffect} from "react";
import {useValue} from "./context/UserContext";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import NotFound from "./Pages/NotFound";
import {auth} from './firebaseInit';

function App() {
  const { userId,handleIdChange} = useValue();

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        handleIdChange(user.uid)
      }
      else handleIdChange(null);
    })
  },[]);

// created high-level protected route below
const ProtectedRoute = ({ children }) => {
  if (userId==null) {
    return <Navigate to="/signIN" />;
  }
  return children;
};

// protected the routes for the cart,orders and signIn/signUp pages
const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<NotFound />,
    element: <NavBar />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "cart/:userId",
        element: <ProtectedRoute><Cart/></ProtectedRoute>
      },
      {
        path: "orders/:userId",
        element: <ProtectedRoute><Orders /></ProtectedRoute>        
      },
      {
        path: "/signIN",
        element: <SignIn/>
      },
      {
        path: "/signUP",
        element: <SignUp/>
      }
    ]
  }
]);



  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
