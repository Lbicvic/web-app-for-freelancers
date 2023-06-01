import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Apply from "../components/main/Apply";

const Applications = () => {
  return (
    <div className="applications">
      <Header />
      <Apply />
    </div>
  );
};
export default Applications;
