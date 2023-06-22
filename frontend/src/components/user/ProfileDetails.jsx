import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import Profile from "./Profile";
import { useParams } from "react-router-dom";


const ProfileDetails = () => {
  const { id } = useParams();
  const [owner, setOwner] = useState([]);
  

  useEffect(() => {
    axios
      .post(
        "http://localhost:3003/api/user/getUser",
        JSON.stringify({ user_id: id }),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setOwner(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [id]);

  return (
    <>
      <Header />
      {owner._id && <Profile user={owner} key={owner._id} is_profile_details={true}/>}
    </>
  );
};

export default ProfileDetails;
