import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewServiceForm = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const costRef = useRef();
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const service = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      cost: costRef.current.value,
      category: category,
    };

    axios
      .post("http://localhost:3003/api/services/", JSON.stringify(service), {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
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
    <section className="service-form">
      <div className="service-form__wrapper">
        <h2>Post New Service</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="title"
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            ref={titleRef}
            required
          />
          <input
            className="description"
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            ref={descriptionRef}
            required
          />
          <input
            className="cost"
            type="text"
            id="cost"
            name="cost"
            placeholder="Cost"
            ref={costRef}
            required
          />
          <div
            className="service-form__radio-buttons"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <input
              className="category"
              type="radio"
              id="categoryDesign"
              name="category"
              value={"Design"}
              required
            />
            <label htmlFor="categoryDesign">Design</label>

            <input
              className="category"
              type="radio"
              id="categoryDevelopment"
              name="category"
              value={"Development"}
              required
            />
            <label htmlFor="categoryDevelopment">Development</label>

            <input
              className="category"
              type="radio"
              id="categoryMarketing"
              name="category"
              value={"Marketing"}
              required
            />
            <label htmlFor="categoryMarketing">Marketing</label>

            <input
              className="category"
              type="radio"
              id="categoryBusiness"
              name="category"
              value={"Business"}
              required
            />
            <label htmlFor="categoryBusiness">Business</label>
          </div>
          <button type="submit">Post Service</button>
          {error && <div className="error"> {error} </div>}
        </form>
      </div>
    </section>
  );
};

export default NewServiceForm;
