import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const RegisterForm = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const [error, setError] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    };

    const response = await axios
      .post("http://localhost:3003/api/user/register", JSON.stringify(user), {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setError("");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
      });

    setCurrentUser(response.data);
    localStorage.setItem("user", JSON.stringify(response));
    navigate("/");
  }

  return (
    <section className="register_form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="firstName"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First name"
          ref={firstNameRef}
          required
        />
        <input
          className="lastName"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last name"
          ref={lastNameRef}
          required
        />
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

        <input
          className="role"
          type="radio"
          id="roleFreelancer"
          name="role"
          value={"FreeLancer"}
          ref={roleRef}
          required
        />
        <label forhtml="roleFreelancer">Freelancer</label>

        <input
          className="role"
          type="radio"
          id="roleUser"
          name="role"
          value={"User"}
          ref={roleRef}
          required
        />
        <label forhtml="roleUser">User</label>

        <button type="submit">Register</button>
        {error && <div className="error"> {error} </div>}
      </form>
    </section>
  );
};

export default RegisterForm;
