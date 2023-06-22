import React from "react";

const Profile = ({ user, is_profile_details }) => {
  return (
    <>
      <div className="user">
        <div className="user__wrapper">
          <h2>Account Details</h2>
          <div className="user__details">
            <img
              className="user__picture"
              src={user.profilePicture.url}
              alt="Profile Picture"
            />
            <p>
              First Name: <span>{user.firstName}</span>
            </p>
            <p>
              Last Name: <span>{user.lastName}</span>
            </p>
            {is_profile_details && (
              <p>
                Email:{" "}
                <a href={`mailto:${user.email}`} className="text-italic">
                  {user.email}
                </a>
              </p>
            )}
            {!is_profile_details && (
              <p>
                Email: <span>{user.email}</span>
              </p>
            )}
            {user.role === "Freelancer" && (
              <p>
                Occupation: <span>{user.occupation}</span>
              </p>
            )}
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
