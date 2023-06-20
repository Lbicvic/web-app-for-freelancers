import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Profile from "../components/user/Profile";

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:3003/api/user/getCurrentUser", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setIsLoading(false);
        setUser(response.data);
      })
      .catch((error) => {
        setIsLoading(true);
        console.log(error.response.data);
      });
  });
  return (
    <>
      <Header />
      {isLoading && <p className="text-center">Loading...</p>}
      {!isLoading && (
        <>
          <Profile user={user} key={user._id} />
        </>
      )}
    </>
  );
};

export default UserProfile;
