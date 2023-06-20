import React, { useEffect, useState } from "react";

const Profile = ({user}) => {
  return (
    <>
      <div className="user">
        <div className="user__wrapper">
          <h2>Account Details</h2>
          <div className="user__details">
            <img className="user__picture" src={user.profilePicture.url} alt="Profile Picture" />
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

export default Profile;
