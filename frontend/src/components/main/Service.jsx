import React from "react";

const Service = ({_id, title, description, cost}) => {
  return (
    <>
      <li className="service" key={_id}>
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
