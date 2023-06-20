import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Apply = () => {
  const { currentUser } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser.role == "user") {
      axios
        .get("http://localhost:3003/api/applications/userApplications", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setIsLoading(false);
          setApplications(response.data);
        })
        .catch((err) => {
          setIsLoading(true);
          console.log(err.response.data);
        });
    } else {
      axios
        .get("http://localhost:3003/api/applications/freelancerApplications", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setIsLoading(false);
          setApplications(response.data);
        })
        .catch((err) => {
          setIsLoading(true);
          console.log(err.response.data);
        });
    }
  });

  const acceptApplication = (application) => {
    application.hire = "accept";
    axios
      .patch(
        `http://localhost:3003/api/applications/${application._id}`,
        JSON.stringify(application),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        navigate("/applications");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const declineApplication = (application) => {
    application.hire = "refuse";
    axios
      .patch(
        `http://localhost:3003/api/applications/${application._id}`,
        JSON.stringify(application),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        navigate("/applications");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteApplication = (id) => {
    axios
      .delete(`http://localhost:3003/api/applications/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        navigate("/applications");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      {isLoading && <p className="text-center">Loading...</p>}
      {!isLoading && (
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
                      {application.hire == "ongoing" && (
                        <>
                          <p>
                            waiting on {application.freelancer_name} to accept
                            or decline application
                          </p>
                          <button
                            onClick={() => deleteApplication(application._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                      {application.hire == "accept" && (
                        <>
                          <p>
                            {application.freelancer_name} has accepted your
                            application, please contact freelancer on this email{" "}
                            {application.freelancer_email}
                          </p>
                        </>
                      )}
                      {application.hire == "refuse" && (
                        <>
                          <p>
                            {application.freelancer_name} has refused your
                            application, please delete this application
                          </p>
                          <div className="application__buttons">
                            <button
                              onClick={() => deleteApplication(application._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {currentUser.role == "freelancer" && (
                    <div className="application__details">
                      <h3>{application.title}</h3>
                      {application.hire == "ongoing" && (
                        <>
                          <p>
                            {application.user_name} wants to hire you for this
                            service
                          </p>
                          <div className="application__buttons">
                            <button
                              onClick={() => acceptApplication(application)}
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => declineApplication(application)}
                            >
                              Decline
                            </button>
                          </div>
                        </>
                      )}
                      {application.hire == "accept" && (
                        <>
                          <p>
                            You have accepted {application.user_name}{" "}
                            application, please contact user on this email{" "}
                            {application.user_email}
                          </p>
                        </>
                      )}
                      {application.hire == "refuse" && (
                        <>
                          <p>
                            You have refused {application.user_name}{" "}
                            application, please delete this application
                          </p>
                          <div className="application__buttons">
                            <button
                              onClick={() => deleteApplication(application._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {applications.length == 0 && (
              <p className="text-center">You have no applications available</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Apply;
