import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // configure 'Link'
import { useDispatch } from "react-redux";
import * as userActions from "../../../redux/users/user.action";
import * as alertActions from "../../../redux/alert/alert.action";

let UserRegister = () => {
  let dispatch = useDispatch(); //  dispatching a request
  let navigate = useNavigate(); //  redirecting path

  //  //  //  //  //  //  form validation  //  //  //  //  //  //
  //  initial state of user
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  //  maintain user error message
  let [userError, setUserError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });

  //  validate userName
  let validateUsername = (event) => {
    setUser({ ...user, name: event.target.value });
    let regExp = /^[a-zA-Z0-9]{4,10}$/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, nameError: "Enter a proper Username" })
      : setUserError({ ...userError, nameError: "" });
  };

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

  let submitRegister = (event) => {
    event.preventDefault();
    //  if 'username'. 'email', and 'password' is not empty
    if (user.name !== "" && user.email !== "" && user.password !== "") {
      dispatch(userActions.registerUser(user, navigate));

      console.log(user);
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
                <i className="fa fa-user-shield" /> Registration
              </p>
              <p>
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content. Lorem ipsum
                may be used as a placeholder before the final copy is available.
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
              <form onSubmit={submitRegister}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={validateUsername}
                    className={`form-control ${
                      userError.nameError.length > 0 ? "is-invalid" : ""
                    }`}
                    placeholder="Name"
                  />
                  {userError.nameError.length > 0 ? (
                    <small className="text-danger">{userError.nameError}</small>
                  ) : (
                    ""
                  )}
                </div>
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
                    value="Register"
                  />
                </div>
              </form>

              <small>
                Already you have an account ?
                <Link
                  to="/users/login"
                  className="font-weight-bold text-teal ml-1"
                >
                  Login
                </Link>
              </small>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default UserRegister;
