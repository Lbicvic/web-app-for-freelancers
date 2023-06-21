import React, { useEffect } from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateServiceForm = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const costRef = useRef();
  const [service, setService] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const location = useLocation();
  const { state } = location;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3003/api/services/${state}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setIsLoading(false);
        setService(response.data);
        setCategory(service.category);
      })
      .catch((err) => {
        setIsLoading(true);
        console.log(err.response.data);
      });
  }, [state]);

  async function handleSubmit(e) {
    e.preventDefault();

    const updatedService = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      cost: costRef.current.value,
      category: category,
    };

    axios
      .patch(
        `http://localhost:3003/api/services/${state}`,
        JSON.stringify(updatedService),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setError("");
        navigate("/myServices");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data.error);
      });
  }

  return (
    <>
      {isLoading && <p className="text-center">Loading...</p>}
      {!isLoading && (
        <section className="service-form">
          <div className="service-form__wrapper">
            <h2> Update Service</h2>
            <form onSubmit={handleSubmit}>
              <input
                className="title"
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                ref={titleRef}
                defaultValue={service.title}
                required
              />
              <input
                className="description"
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                ref={descriptionRef}
                defaultValue={service.description}
                required
              />
              <input
                className="cost"
                type="text"
                id="cost"
                name="cost"
                placeholder="Cost"
                ref={costRef}
                defaultValue={service.cost}
                required
              />
              <div
                className="service-form__radio-buttons"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {service.category === "design" && (
                  <>
                    <input
                      className="category"
                      type="radio"
                      id="categoryDesign"
                      name="category"
                      value={"Design"}
                      defaultChecked={true}
                      required
                    />
                    <label htmlFor="categoryDesign">Design</label>
                  </>
                )}
                {service.category !== "design" && (
                  <>
                    <input
                      className="category"
                      type="radio"
                      id="categoryDesign"
                      name="category"
                      value={"Design"}
                      required
                    />
                    <label htmlFor="categoryDesign">Design</label>
                  </>
                )}
                {service.category === "development" && (
                  <>
                    <input
                      className="category"
                      type="radio"
                      id="categoryDevelopment"
                      name="category"
                      value={"Development"}
                      defaultChecked={true}
                      required
                    />
                    <label htmlFor="categoryDevelopment">Development</label>
                  </>
                )}
                {service.category !== "development" && (
                  <>
                    <input
                      className="category"
                      type="radio"
                      id="categoryDevelopment"
                      name="category"
                      value={"Development"}
                      required
                    />
                    <label htmlFor="categoryDevelopment">Development</label>
                  </>
                )}
                {service.category === "marketing" && (
                  <>
                    <input
                      className="category"
                      type="radio"
                      id="categoryMarketing"
                      name="category"
                      value={"Marketing"}
                      defaultChecked={true}
                      required
                    />
                    <label htmlFor="categoryMarketing">Marketing</label>
                  </>
                )}
                {service.category !== "marketing" && (
                  <>
                    <input
                      className="category"
                      type="radio"
                      id="categoryMarketing"
                      name="category"
                      value={"Marketing"}
                      required
                    />
                    <label htmlFor="categoryMarketing">Marketing</label>
                  </>
                )}
                {service.category === "business" && (
                  <>
                    <input
                      className="category"
                      type="radio"
                      id="categoryBusiness"
                      name="category"
                      value={"Business"}
                      defaultChecked={true}
                      required
                    />
                    <label htmlFor="categoryBusiness">Business</label>
                  </>
                )}
                {service.category !== "business" && (
                  <>
                    <input
                      className="category"
                      type="radio"
                      id="categoryBusiness"
                      name="category"
                      value={"Business"}
                      required
                    />
                    <label htmlFor="categoryBusiness">Business</label>
                  </>
                )}
              </div>
              <button type="submit">Update</button>
              {error && <div className="error"> {error} </div>}
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default UpdateServiceForm;
