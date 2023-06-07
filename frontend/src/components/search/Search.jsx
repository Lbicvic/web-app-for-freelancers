import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import searchLogo from "../../assets/searchLogo.png";

const Search = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const search = () => {
    const title = document.getElementById("search").value;
    navigate("/searchedServices", { state: title });
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      search();
    }
  };

  return (
    <>
      <section className="search">
        <div className="search__wrapper">
          {currentUser && (
            <div className="search__box">
              <i className="" onClick={() => search()}>
                <img width="30px" height="30px" src={searchLogo} alt="Search Icon" />
              </i>
              <input
                type="text"
                placeholder="Search"
                id="search"
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Search;
