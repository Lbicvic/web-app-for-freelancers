import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import Header from "../Header";

const Survey = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Header />
      <section className="survey">
        <div className="survey__wrapper">
          <h2>Survey</h2>
          <p>This Survey will have questions...</p>
          <p>
            Return to{" "}
            <Link to="/home" className="form__link">
              Homepage
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Survey;
