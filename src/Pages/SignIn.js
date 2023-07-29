import React,{useState} from 'react'
import { useValue } from '../context/UserContext'
import { useNavigate } from "react-router-dom";

function SignIn() {
  const {fMethodToLogin}=useValue();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const gotoSignUp=()=>{
    navigate("/signUP");
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;      
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
      // TODO: Submit the form data to the server  
      fMethodToLogin(email,password);
      navigate('/');
  };

  return (

    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className="border w-50 ">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <br/>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />        
        <button type="submit">Sign In</button>
      </form>
      <button onClick={gotoSignUp}>REgister</button>
    </div>

    
  )
}

export default SignIn