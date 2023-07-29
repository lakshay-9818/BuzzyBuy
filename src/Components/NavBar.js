import { NavLink, Outlet } from "react-router-dom";
import { useValue } from "../context/UserContext";
import { useProdVal } from '../context/ProductContext';
import { Button,Badge} from "react-bootstrap";



const NavBar = () => {
const { userId,fMethodToLogout } = useValue();
const {cartList} = useProdVal();


  return (
    <div>
      <div className="navbar px-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3176/3176363.png"
          alt="logo"
          onClick={() => window.location.replace("/")}
        />

        <nav>
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    border: "2px solid #fff",
                    backgroundColor: "#e1d1f976"
                  }
                : null
            }
            to="/"
          >
            Home
          </NavLink>
{userId?<>
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    border: "2px solid #fff",
                    backgroundColor: "#e1d1f976"
                  }
                : null
            }
            to={`/orders/${userId}`}
          >
            My Orders
          </NavLink>

          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    border: "2px solid #fff",
                    backgroundColor: "#e1d1f976"
                  }
                : null
            }
            to={`/cart/${userId}`}
          >    Cart                
      <Badge bg="info" className="ms-1">
        {cartList.length}
      </Badge>      
          </NavLink>
          <Button variant="danger" onClick={fMethodToLogout}>Log Out</Button>
          
</>:    
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    border: "2px solid #fff",
                    backgroundColor: "#e1d1f976"
                  }
                : null
            }
            to="/signIN"
          >
            Log In
          </NavLink>
}     
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;