import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as userRender from "../../redux/users/userReducer"; //  To display data from the store
import * as userActions from "../../redux/users/user.action";

let Navbar = () => {
  let dispatch = useDispatch();

  let navigate = useNavigate(); // useHistory()  ->  replaced by  useNavigate()
  let userInfo = useSelector((state) => {
    return state[userRender.userFeatureKey]; // fetch the initialState from 'userReducer'
  });

  // "user" -> display userInfo.  &&  "isAuthenticated" -> display the login logic
  let { user, isAuthenticated } = userInfo; // getting data from 'userReducer' and distructuring them here

  let clickLogOut = () => {
    dispatch(userActions.logoutUser(navigate));
  };

  // before login button display ->  "Register" and "Login"
  let beforeLogin = (
    <React.Fragment>
      {/* nav Register */}
      <li className="nav-item">
        <Link to="/users/register" className="nav-link">
          <span className="ml-1">Register</span>
        </Link>
      </li>
      {/* nav Login */}
      <li className="nav-item">
        <Link to="/users/login" className="nav-link">
          <span className="ml-1">Login</span>
        </Link>
      </li>
    </React.Fragment>
  );

  // after login button display ->  "Profile" -> loggedIn person profile info  and  "Logout" -> loggedIn person only do loggedOut
  let afterLogin = (
    <React.Fragment>
      {Object.keys(user).length > 0 && ( // 'Object.keys(user).length' -> checks the length of objects
        <React.Fragment>
          <li className="nav-item">
            {/*  🚀 🎢 ♻️ To display / working below link we need to configure this in App.js file  */}
            <Link to="/posts/list" className="nav-link">
              <i className="fa fa-list" />
              <span className="ml-1">posts</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profiles/dashboard" className="nav-link">
              <i className="fa fa-sitemap" />
              <span className="ml-1">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <img
                src={user.avatar}
                alt=""
                width="30"
                height="30"
                className="rounded-circle"
              />
            </Link>
          </li>
        </React.Fragment>
      )}

      {/* nav logout */}
      <li className="nav-item">
        <Link to="/" className="nav-link" onClick={clickLogOut}>
          {/* after logout person go to home page */}
          <i className="fa fa-sign-out font-weight-bold" />
          <span className="ml-1">Logout</span>
        </Link>
      </li>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <div className="container">
          <Link to="/" className="navbar-brand animated jello">
            <i className="fa fa-code" /> React Social
          </Link>

          {/* below list is gone to  'collapse'  when during response checking */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              {/* nav Developer */}
              <li className="nav-item">
                <Link to="/developers" className="nav-link">
                  <i className="fa fa-user-tie" />
                  <span className="ml-1">developers</span>
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              {/* login and logout we display conditionaly  =>  a/c to person has been authentication = true / not */}
              {isAuthenticated ? afterLogin : beforeLogin}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
