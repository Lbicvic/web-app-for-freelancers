import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
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
              <h2>Freelance</h2>
            </Link>
          </div>
          <nav>
            <div className="nav__links">
              <div>
                <Link to="/login"> Login </Link>
                <Link to="/register">Register</Link>
              </div>
            </div>
          </nav>
        </div>
      )}
      {localStorage.getItem("user") && (
        <div className="header__content">
          <div className="header__title">
            <Link to="/home">
              <h2>Freelance</h2>
            </Link>
          </div>
          <nav>
            <div className="nav__links">
              <div>
                <Link to="/myProfile"> Profile </Link>
              </div>
            </div>
            <button onClick={handleLogout}>Log out</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
