import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post("http://localhost:3003/api/user/login", JSON.stringify(user), {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setError("");
        setCurrentUser(response.data.userData);
        const userDetails = {
          role: response.data.userData.role,
          token: response.data.token,
        };
        localStorage.setItem("user", JSON.stringify(userDetails));
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data.error);
      });
  }

  return (
    <section className="login-form">
      <div className="login-form__wrapper">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="email"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            ref={emailRef}
            required
          />
          <input
            className="password"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="on"
            ref={passwordRef}
            required
          />
          <button type="submit">Login</button>
          {error && <div className="error"> {error} </div>}
          <p>
            Need an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
