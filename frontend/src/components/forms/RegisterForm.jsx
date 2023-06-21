import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const RegisterForm = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [role, setRole] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [sucessStatus, setSucessStatus] = useState("");
  const occupationRef = useRef();

  const setFileToBase64 = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setProfilePicture(reader.result);
    reader.onerror = (error) => console.log(error);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: role,
      profilePic: profilePicture,
      occupation: occupationRef.current.value,
    };

    axios
      .post("http://localhost:3003/api/user/register", JSON.stringify(user), {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setError("");
        setSucessStatus("Register completed");
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
        setSucessStatus("");
        setError(error.response.data.error);
      });
  }

  return (
    <section className="register-form">
      <div className="register-form__wrapper">
        {sucessStatus && (
          <div className="register-form__completed"> {sucessStatus} </div>
        )}
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
          <div
            className="register-form__radio-buttons"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <input
              className="role"
              type="radio"
              id="roleFreelancer"
              name="role"
              value={"Freelancer"}
              required
            />
            <label htmlFor="roleFreelancer">Freelancer</label>

            <input
              className="role"
              type="radio"
              id="roleUser"
              name="role"
              value={"User"}
              required
            />
            <label htmlFor="roleUser">User</label>
          </div>
          <label htmlFor="occupation">Choose an Occupation:</label>
          <select
            name="occupation"
            id="occupation"
            className="occupation"
            ref={occupationRef}
          >
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Fullstack Developer">Fullstack Developer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Android Developer">Android Developer</option>
            <option value="Flutter Developer">Flutter Developer</option>
            <option value="iOS Developer">iOS Developer</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Hardware Engineer">Hardware Engineer</option>
            <option value="Designer">Designer</option>
            <option value="Photographer">Photographer</option>
            <option value="Human Resources Tech">Human Resources Tech</option>
          </select>
          <label htmlFor="profile">Choose Profile Picture:</label>
          <input
            className="profile-picture"
            type="file"
            id="profilePicture"
            name="profile"
            accept="image/*"
            onChange={async (e) => {
              await setFileToBase64(e.target.files[0]);
            }}
            required
          />
          <button type="submit">Register</button>
          {error && <div className="error"> {error} </div>}
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
