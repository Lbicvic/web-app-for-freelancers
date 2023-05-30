import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3003/api/user/getCurrentUser", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  });
  return (
    <>
      <Header />
      <div className="user">
        <div className="user__wrapper">
          <h2>Account Details</h2>
          <div className="user__details">
            <p>
              First Name: <span>{user.firstName}</span>
            </p>
            <p>
              Last Name: <span>{user.lastName}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Skills: <span>{user.skills}</span>
            </p>
            <p>
              Role: <span>{user.role}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
