import React from "react";
import { useNavigate } from "react-router-dom";

const Service = ({ _id, title, description, cost }) => {
  const navigate = useNavigate();

  const selectService = (serviceID) => {
    navigate("/serviceDetails", { state: serviceID });
  };

  return (
    <>
      <li className="service" key={_id} onClick={() => selectService(_id)}>
        <div className="service__wrapper" key={_id}>
          <div className="service__content">
            <h3>{title}</h3>
            <p>{description}</p>
            <h4>{cost} €</h4>
          </div>
        </div>
      </li>
    </>
  );
};

export default Service;
