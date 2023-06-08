import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Service = ({
  _id,
  title,
  description,
  cost,
  user_name,
  user_id,
  is_details,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const selectService = (serviceID) => {
    navigate("/serviceDetails", { state: serviceID });
  };

  return (
    <>
      {is_details && (
        <li className="service" key={_id}>
          <div className="service__wrapper" key={_id}>
            <div className={`service__content ${is_details}`}>
              <h3>{title}</h3>
              <p>{description}</p>
              <h4>{cost} €</h4>
              {currentUser._id != user_id && (
                <Link to={`/profileDetails/${user_id}`}>
                  <p>Owner: {user_name}</p>
                </Link>
              )}
            </div>
          </div>
        </li>
      )}
      {!is_details && (
        <li className="service" key={_id} onClick={() => selectService(_id)}>
          <div className="service__wrapper" key={_id}>
            <div className="service__content">
              <h3>{title}</h3>
              <p>{description}</p>
              <h4>{cost} €</h4>
              {currentUser._id != user_id && <p>Owner: {user_name}</p>}
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default Service;
