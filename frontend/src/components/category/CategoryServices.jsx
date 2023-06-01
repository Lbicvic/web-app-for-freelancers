import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Service from "../main/Service";

const CategoryServices = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const { state } = location;

  useEffect(() => {
    axios
      .post(
        "http://localhost:3003/api/services/categories",
        JSON.stringify({ category: state }),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setServices(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [state]);

  return (
    <>
      <Header />
      <ul>
        {services.map((service) => {
          return <Service {...service} key={service._id} />;
        })}
      </ul>
      {services.length == 0 && (
        <p>There are no available services for this category</p>
      )}
    </>
  );
};

export default CategoryServices;
