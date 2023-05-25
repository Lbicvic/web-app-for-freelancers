import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/login")
    }

    return (
        <header>
            <div className="header__title">
                <Link to="/">
                    <h2>Freelance</h2>
                </Link>
                <nav>
                    <div className="nav__links">
                        <Link to="/login"> Login </Link>
                        <Link to="/register">Register</Link>
                    </div>
                    <button onClick={handleLogout}>Log out</button>
                </nav>
            </div>
        </header>
    )
}

export default Navbar