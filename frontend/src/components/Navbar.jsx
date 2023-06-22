import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Search from "./search/Search";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header>
      {!localStorage.getItem("user") && (
        <div className="header__content">
          <div className="header__title">
            <Link to="/">
              <h2>Adlancer</h2>
            </Link>
          </div>
          <nav className="nav">
            <div className="nav__links">
              <Link to="/login"> Login </Link>
              <Link to="/register">Register</Link>
            </div>
          </nav>
        </div>
      )}
      {localStorage.getItem("user") && (
        <div className="header__content">
          <div className="header__title">
            <Link to="/home">
              <h2>Adlancer</h2>
            </Link>
          </div>
          <nav className="nav">
            <Search />
            <div className="nav__links">
              {JSON.parse(localStorage.getItem("user")).role ==
                "Freelancer" && (
                <>
                  <Link to="/newService"> Post New Service </Link>
                  <Link to="/myServices"> My Services </Link>
                </>
              )}
              <Link to="/applications"> Applications </Link>
              <Link to="/myProfile"> Profile </Link>
            </div>
            <button onClick={handleLogout}>Log out</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
