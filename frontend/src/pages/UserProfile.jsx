import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Profile from "../components/user/Profile";

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
      <Profile user={user} key={user._id}/>
    </>
  );
};

export default UserProfile;
