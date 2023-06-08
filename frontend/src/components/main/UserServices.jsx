import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Service from "./Service";
import AuthContext from "../context/AuthContext";

const UserServices = () => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3003/api/services/myServices",
        JSON.stringify(currentUser),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setIsLoading(false);
        setServices(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response.data);
      });
  }, [currentUser]);

  return (
    <>
      {isLoading && <p className="text-center">Loading...</p>}
      {!isLoading && (
        <>
          <ul>
            {services.map((service) => {
              return <Service {...service} key={service._id} />;
            })}
          </ul>
          {services.length == 0 && (
            <p>There are no available services for this category</p>
          )}
        </>
      )}
    </>
  );
};

export default UserServices;
