import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Apply = () => {
  const { currentUser } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (currentUser.role == "user") {
      axios
        .get("http://localhost:3003/api/applications/userApplications", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setApplications(response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      axios
        .get("http://localhost:3003/api/applications/freelancerApplications", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setApplications(response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  });

  return (
    <>
      <div className="application">
        <div className="application__wrapper">
          {applications.map((application, index) => {
            return (
              <div
                className="application__item"
                key={index}
                id={application.title}
              >
                {currentUser.role == "user" && (
                  <div className="application__details">
                    <h3>{application.title}</h3>
                    <p>
                      waiting on {application.freelancer_name} to accept or
                      refuse application
                    </p>
                  </div>
                )}
                {currentUser.role == "freelancer" && (
                  <div className="application__details">
                    <h3>{application.title}</h3>
                    <p>
                      {application.user_name} wants to hire you for this service
                    </p>
                    <button>Accept</button>
                    <button>Refuse</button>
                  </div>
                )}
              </div>
            );
          })}
          {applications.length == 0 && <p>You have no applications available</p>}
        </div>
      </div>
    </>
  );
};

export default Apply;
