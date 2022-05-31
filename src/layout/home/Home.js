import React from "react";
import { Link } from "react-router-dom";

let Home = () => {
  return (
    <React.Fragment>
      <div className="landing-page">
        <div className="wrapper">
          <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
            <h5 className="display-4 animated zoomIn">React-Social-App</h5>
            <p className="animated zoomIn">
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before the final copy is available.
            </p>
            <div className="animated zoomInDown">
              <Link
                to="/users/register"
                className="btn btn-white btn-sm text-teal"
              >
                Register
              </Link>
              <Link to="users/login" className="btn btn-teal btn-sm">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
