import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as alertActions from "../../../redux/alert/alert.action";
import * as userActions from "../../../redux/users/user.action";

let UserLogin = () => {
  let dispatch = useDispatch(); //  dispatching a request
  let navigate = useNavigate(); //  redirecting path

  //  //  //  //  //  //  form validation  //  //  //  //  //  //
  //  initial state of user
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  //  maintain user error message
  let [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
  });

  //   validate email
  let validateEmail = (event) => {
    setUser({ ...user, email: event.target.value });
    let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, emailError: "Enter a proper Email" })
      : setUserError({ ...userError, emailError: "" });
  };

  //  validate password
  let validatePassword = (event) => {
    setUser({ ...user, password: event.target.value });
    let regExp = /^[A-Za-z]\w{7,14}$/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, passwordError: "Enter a proper Password" })
      : setUserError({ ...userError, passwordError: "" });
  };

  let submitLogin = (event) => {
    event.preventDefault();
    //  if 'email', and 'password' is not empty
    if (user.email !== "" && user.password !== "") {
      // here we dispatch an action to the  'user.action.js' file and calling to  "loginUser" method
      dispatch(userActions.loginUser(user, navigate));

      // console.log(user);
    } else {
      dispatch(alertActions.setAlert("please fill in the fields", "danger"));
    }
  };
  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col">
              <p className="h3 text-teal">
                <i className="fa fa-sign-in-alt" /> Login
              </p>
              <p>
                In computer security, logging in (or logging on, signing in, or
                signing on) is the process by which an individual gains access
                to a computer system by identifying and authenticating
                themselves. The user credentials are typically some form of
                username and a matching password,[1] and these credentials
                themselves are sometimes referred to as a login.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* below section is generated for seperate form field */}
      <section>
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col-md-8">
              <form onSubmit={submitLogin}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={validateEmail}
                    className={`form-control ${
                      userError.emailError.length > 0 ? "is-invalid" : ""
                    }`}
                    placeholder="Email"
                  />
                  {userError.emailError.length > 0 ? (
                    <small className="text-danger">
                      {userError.emailError}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={validatePassword}
                    className={`form-control ${
                      userError.passwordError.length > 0 ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                  />
                  {userError.passwordError.length > 0 ? (
                    <small className="text-danger">
                      {userError.passwordError}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <input
                    type="submit"
                    className="btn btn-teal btn-sm rounded-pill"
                    value="Login"
                  />
                </div>
              </form>

              <small>
                Don't have an account ?
                <Link
                  to="/users/register"
                  className="font-weight-bold text-teal ml-1"
                >
                  Register
                </Link>
              </small>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default UserLogin;
