import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Service from "../main/Service";
import AuthContext from "../context/AuthContext";

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [service, setService] = useState([]);
  const { state } = location;
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3003/api/services/${state}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setService(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [state]);

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

  return (
    <>
      <Header />
      <Service {...service} key={service._id} />
      {currentUser._id == service.user_id && (
        <div className="update-delete-button">
          <button onClick={() => updateService(service._id)}>Update</button>
          <button onClick={() => deleteService(service._id)}>Delete</button>
        </div>
      )}
    </>
  );
};

export default ServiceDetails;
