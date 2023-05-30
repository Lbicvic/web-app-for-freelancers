import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../Header";

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
          return (
            <li className="service" key={service._id}>
              <div className="service__wrapper" key={service._id}>
                <div className="service__content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <h4>{service.cost} €</h4>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CategoryServices;
