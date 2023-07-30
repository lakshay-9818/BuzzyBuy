import React, { useState } from "react";
import { useValue } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import {Container} from 'react-bootstrap'
import "../signInstyl.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { fMethodToRegister } = useValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match!");
      return;
    }
    // Submitting the form data to the cloud firestore
    fMethodToRegister(email, password);
    navigate("/");
  };

  return (
    <Container className="w-50 border bg-light rounded-3 my-1">
    <div className="card-body p-5">
      <h2 className="text-uppercase text-center mb-5">Create an account</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3cg">
            Your Email
          </label>
          <input
            type="email"
            id="form3Example3cg"
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

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example4cdg">
            Repeat your password
          </label>
          <input
            type="password"
            id="form3Example4cdg"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
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
            Register
          </button>
        </div>

        <p className="text-center text-muted mt-5 mb-0">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signIN")}
            className="fw-bold text-body"
          >
            <u>Login Here</u>
          </span>
        </p>
      </form>
    </div>
    </Container>
  );
};

export default SignUp;