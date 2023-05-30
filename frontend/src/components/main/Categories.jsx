import React from "react";
import { useNavigate } from "react-router-dom";


const Categories = () => {
  const navigate = useNavigate();
  const categories = [
    {
      categoryName: "Development",
    },
    {
      categoryName: "Design",
    },
    {
      categoryName: "Marketing",
    },
    {
      categoryName: "Business",
    },
  ];

  const selectCategory = (categoryName) => {
    navigate( "/categoryServices", {state: categoryName});
  };

  return (
    <>
      <div className="categories">
        <div className="categories__wrapper">
          {categories.map((category, index) => {
            return (
              <div
                className="category__item"
                key={index}
                id={category.categoryName}
                onClick={() => selectCategory(category.categoryName)}
              >
                <h3>{category.categoryName}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Categories;
