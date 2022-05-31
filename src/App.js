import React, { useEffect } from "react";
import "./App.css";
import Home from "./layout/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./layout/navbar/Navbar";
import DeveloperList from "./modules/developers/developer-list/DeveloperList";
import DeveloperDetails from "./modules/developers/developer-details/DeveloperDetails";
import UserRegister from "./modules/users/user-register/UserRegister";
import UserLogin from "./modules/users/user-login/UserLogin";
import Alert from "./layout/misc/alert/Alert";
import Dashboard from "./modules/profiles/dashboard/Dashboard";
import CreateProfile from "./modules/profiles/create-profile/CreateProfile";
import EditProfile from "./modules/profiles/edit-profile/EditProfile";
import AddEducation from "./modules/profiles/add-education/AddEducation";
import AddExperience from "./modules/profiles/add-experience/AddExperience";
import * as userActions from "./redux/users/user.action";
import { useDispatch } from "react-redux";
import PostList from "./modules/posts/post-list/PostList";
import PostDetails from "./modules/posts/post-details/PostDetails";
// import PrivateRoute from "./util/PrivateRoute";

const App = () => {
  let dispatch = useDispatch(); // dispatching any action

  //  //  🌳 😄 🥰  whenever this page gets loaded then automatically call below method  👍 💭
  //  📓📓📓📓📓  Even after refreshing the page below action dispatch() and fetching data 📓📓📓📓📓📓
  useEffect(() => {
    dispatch(userActions.getUserInfo());
  }, []);
  return (
    <React.Fragment>
      {/* Router configuration */}
      <Router>
        <Navbar />

        {/* adding  alert component here to display alert message in every component */}
        <Alert />

        {/* Component specification */}
        <Routes>
          {/* 👿👿👿👿  "PrivateRoute" -> w/o login we can't access it */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profiles/dashboard" element={<Dashboard />} />
          <Route exact path="/developers" element={<DeveloperList />} />
          <Route
            exact
            path="/developers/:developerId" // "developerId" -> comes from url of the component
            element={<DeveloperDetails />}
          />
          <Route exact path="/users/register" element={<UserRegister />} />
          <Route exact path="/users/login" element={<UserLogin />} />
          <Route
            exact
            path="/profiles/create-profile"
            element={<CreateProfile />}
          />
          <Route
            exact
            path="/profiles/edit-profile"
            element={<EditProfile />}
          />
          <Route
            exact
            path="/profiles/add-education"
            element={<AddEducation />}
          />
          <Route
            exact
            path="/profiles/add-experience"
            element={<AddExperience />}
          />
          <Route exact path="/posts/list" element={<PostList />} />
          <Route exact path="/posts/:postId" element={<PostDetails />} />
        </Routes>
      </Router>

      <div style={{ marginBottom: "100px" }} />
    </React.Fragment>
  );
};

export default App;
