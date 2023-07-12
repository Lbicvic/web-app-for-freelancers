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
    if (currentUser.role == "User") {
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

  const completeApplication = (application) => {
    application.hire = "completed";
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
                  {currentUser.role == "User" && (
                    <div className="application__details">
                      <h3>{application.title}</h3>
                      {application.hire == "ongoing" && (
                        <>
                          <p>
                            waiting on{" "}
                            <span className="text-italic">
                              {application.freelancer_name}
                            </span>{" "}
                            to accept or decline application
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
                            <span className="text-italic">
                              {application.freelancer_name}
                            </span>{" "}
                            has accepted your application, please contact
                            freelancer on this email{" "}
                            <a
                              href={`mailto:${application.freelancer_email}`}
                              className="text-italic"
                            >
                              {application.freelancer_email}
                            </a>
                          </p>
                        </>
                      )}
                      {application.hire == "refuse" && (
                        <>
                          <p>
                            <span className="text-italic">
                              {application.freelancer_name}
                            </span>{" "}
                            has refused your application, please delete this
                            application
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
                      {application.hire == "completed" && (
                        <>
                          <p>
                            <span className="text-italic">
                              {application.freelancer_name}
                            </span>{" "}
                            has completed this service, if something went wrong,
                            please contact him again on{" "}
                            <a
                              href={`mailto:${application.freelancer_email}`}
                              className="text-italic"
                            >
                              {application.freelancer_email}
                            </a>
                          </p>
                        </>
                      )}
                    </div>
                  )}
                  {currentUser.role == "Freelancer" && (
                    <div className="application__details">
                      <h3>{application.title}</h3>
                      {application.hire == "ongoing" && (
                        <>
                          <p>
                            <span className="text-italic">
                              {application.user_name}
                            </span>{" "}
                            wants to hire you for this service
                          </p>
                          <div className="application__buttons">
                            <button
                              onClick={() => acceptApplication(application)}
                            >
                              {" "}
                              Accept
                            </button>
                            <button
                              onClick={() => declineApplication(application)}
                            >
                              {" "}
                              Decline
                            </button>
                          </div>
                        </>
                      )}
                      {application.hire == "accept" && (
                        <>
                          <p>
                            You have accepted{" "}
                            <span className="text-italic">
                              {application.user_name}
                            </span>{" "}
                            application, please contact user on this email{" "}
                            <a
                              href={`mailto:${application.user_email}`}
                              className="text-italic"
                            >
                              {application.user_email}
                            </a>
                            . After completing this service, if user has paid
                            you, please mark this application as Completed
                          </p>
                          <button
                            onClick={() => completeApplication(application)}
                          >
                            {" "}
                            Completed{" "}
                          </button>
                        </>
                      )}
                      {application.hire == "refuse" && (
                        <>
                          <p>
                            You have refused{" "}
                            <span className="text-italic">
                              {application.user_name}
                            </span>{" "}
                            application, please delete this application
                          </p>
                          <div className="application__buttons">
                            <button
                              onClick={() => deleteApplication(application._id)}
                            >
                              {" "}
                              Delete{" "}
                            </button>
                          </div>
                        </>
                      )}
                      {application.hire == "completed" && (
                        <>
                          <p>
                            You have completed this service and{" "}
                            <span className="text-italic">
                              {application.user_name}
                            </span>{" "}
                            has paid you in full, if something went wrong,
                            please contact user on this email{" "}
                            <a
                              href={`mailto:${application.user_email}`}
                              className="text-italic"
                            >
                              {application.user_email}
                            </a>{" "}
                            or undo application status
                          </p>
                          <button
                            onClick={() => acceptApplication(application)}
                            className="text-center"
                          >
                            {" "}
                            Undo{" "}
                          </button>
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
