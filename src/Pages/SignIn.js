import React, { useState } from "react";
import { useValue } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../signInstyl.css";
import { Container } from "react-bootstrap";

function SignIn() {
  const { fMethodToLogin } = useValue();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    fMethodToLogin(email, password);
    navigate("/");
  };

  return (
    <Container className="w-50 border rounded-3 bg-light my-1">
    <div className="card-body p-5">
      <h2 className="text-uppercase text-center mb-5">LogIn to your account</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3cg">
            Your Email
          </label>
          <input
            id="form3Example3cg"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="form-control form-control-lg"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example4cg">
            Password
          </label>
          <input
            type="password"
            id="form3Example4cg"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            className="form-control form-control-lg"
          />
        </div>

        <div className="form-check d-flex justify-content-center mb-5">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="form2Example3cg"
          />
          <label className="form-check-label" htmlFor="form2Example3g">
            I agree all statements in{" "}
            <a href="#!" className="text-body">
              <u>Terms of service</u>
            </a>
          </label>
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
          >
            Log In
          </button>
        </div>

        <p className="text-center text-muted mt-5 mb-0">
          New to BuzzyBuy?{" "}
          <span
            onClick={() => navigate("/signUP")}
            className="fw-bold text-body"
          >
            <u>Create an account</u>
          </span>
        </p>
      </form>
    </div>
    </Container>
  );
}

export default SignIn;