import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Service from "../main/Service";

const SearchedServices = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const { state } = location;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3003/api/services/searchByTitle",
        JSON.stringify({ title: state }),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setIsLoading(false);
        setServices(response.data);
      })
      .catch((error) => {
        setIsLoading(true);
        console.log(error.response.data);
      });
  }, [state]);

  return (
    <>
      <Header />
      {isLoading && <p className="text-center">Loading...</p>}
      {!isLoading && (
        <>
          <ul>
            {services.map((service) => {
              return <Service {...service} key={service._id} />;
            })}
          </ul>
          {services.length == 0 && (
            <p className="text-center">
              There are no available services by searched title
            </p>
          )}
        </>
      )}
    </>
  );
};

export default SearchedServices;
