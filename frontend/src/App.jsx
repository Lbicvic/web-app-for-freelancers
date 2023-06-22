import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./index.scss";
import axios from "axios";

import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CategoryServices from "./components/category/CategoryServices";
import AuthContext from "./components/context/AuthContext";
import UserProfile from "./pages/UserProfile";
import MyServices from "./pages/MyServices";
import NewService from "./pages/NewService";
import ServiceDetails from "./components/main/ServiceDetails";
import UpdateService from "./pages/UpdateService";
import Applications from "./pages/Applications";
import SearchedServices from "./components/search/SearchedServices";
import ProfileDetails from "./components/user/ProfileDetails";
import Survey from "./components/survey/Survey";

function App() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  if (localStorage.getItem("user")) {
    axios.defaults.headers.common = {
      authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    };
  }

  useEffect(() => {
    axios
      .get("http://localhost:3003/api/user/getCurrentUser", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  });

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/categoryServices"
            element={<CategoryServices />}
          ></Route>
          <Route path="/myProfile" element={<UserProfile />}></Route>
          <Route path="/profileDetails/:id" element={<ProfileDetails />}></Route>
          <Route path="/myServices" element={<MyServices />}></Route>
          <Route path="/serviceDetails/:id" element={<ServiceDetails />}></Route>
          <Route path="/updateService" element={<UpdateService />}></Route>
          <Route path="/newService" element={<NewService />}></Route>
          <Route path="/applications" element={<Applications />}></Route>
          <Route path="/searchedServices" element={<SearchedServices />}></Route>
          <Route path="/survey" element={<Survey />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
