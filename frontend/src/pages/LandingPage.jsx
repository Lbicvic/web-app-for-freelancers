import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const LandingPage = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("user")) {
    navigate("/home");
  }
  return (
    <div className="landing-page">
      <Header />
      <p className="text-center">Welcome to the Adlancer assisting app</p>
    </div>
  );
};
export default LandingPage;
