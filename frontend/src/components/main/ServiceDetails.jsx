import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Service from "../main/Service";
import AuthContext from "../context/AuthContext";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3003/api/services/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setError("");
        setIsLoading(false);
        setService(response.data);
      })
      .catch((err) => {
        setIsLoading(true);
        console.log(err.response.data);
      });
  }, [id]);

  const deleteService = (id) => {
    axios
      .delete(`http://localhost:3003/api/services/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        navigate("/myServices");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const updateService = (id) => {
    navigate("/updateService", { state: id });
  };

  const hireFreelancer = async () => {
    if (currentUser._id != service.user_id && currentUser.role == "User") {
      const application = {
        hire: "ongoing",
        freelancer_id: service.user_id,
        freelancer_name: service.user_name,
        title: service.title,
        freelancer_email: service.user_email,
      };

      axios
        .post(
          "http://localhost:3003/api/applications/",
          JSON.stringify(application),
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          if (response.data.error) {
            setError(response.data.error);
          } else {
            setError("");
            navigate("/applications");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  return (
    <>
      <Header />
      {isLoading && <p className="text-center">Loading...</p>}
      {!isLoading && (
        <>
          <Service {...service} key={service._id} is_details={"is-details"} />
          {currentUser._id == service.user_id && (
            <div className="update-delete-button">
              <button onClick={() => updateService(service._id)}>Update</button>
              <button onClick={() => deleteService(service._id)}>Delete</button>
            </div>
          )}
          {currentUser.role == "User" && (
            <div className="hire-button">
              <button onClick={() => hireFreelancer()}>Hire</button>
            </div>
          )}
          {error && <p className="text-center"> {error} </p>}
        </>
      )}
    </>
  );
};

export default ServiceDetails;
