import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userReducer from "../../../redux/users/userReducer";
import Spinner from "../../../layout/misc/spinner/Spinner";
import * as profileActions from "../../../redux/profiles/profile.action";
import * as profileReducer from "../../../redux/profiles/profile.reducer";
import { Link } from "react-router-dom";

let Dashboard = () => {
  let dispatch = useDispatch();

  //  here we get all user's data from STORE by 'reducer' file and store them in local variable
  let userInfo = useSelector((state) => {
    return state[userReducer.userFeatureKey]; // fetch the initialState from 'userReducer'
  });

  let profileInfo = useSelector((state) => {
    return state[profileReducer.profileFeatureKey];
  });

  // 1st we've to check profile object is empty or not,  Empty -> make an option of "Create profile",  Not Empty -> make an option of "Edit profile"
  let { profile, loading } = profileInfo;

  //  // 🍰🍰🍰🍰 'dispatch' an action to fetch the data and that data is loaded as soon as page is loaded
  useEffect(() => {
    dispatch(profileActions.getProfile());
  }, []); // [] -> empty array is the dependency array that triggers url only-one times

  let { user } = userInfo; //  loading -> flag,  user -> an object @ user''s info

  //  Delete experience
  let clickDeleteExperience = (experienceId) => {
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
    console.log(experienceId);
    dispatch(profileActions.deleteExperience(experienceId));
  };

  //  Delete education
  let clickDeleteEducation = (educationId) => {
    dispatch(profileActions.deleteEducation(educationId));
  };

  return (
    <React.Fragment>
      {loading ? ( // checks weather data if fetching or not ?
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 text-teal">
                    <i className="fa fa-sitemap" />
                    <span className="ml-1">Dashboard</span>
                  </p>
                  {/* before showing user's profile condition check */}
                  {Object.keys(user).length > 0 && ( //  &&  ->  if this happens then do this
                    <p className="h5">Welcome {user.name}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}

      {/* here 1st we've to check profile object is empty or not,  Empty -> make an option of "Create profile",  Not Empty -> make an option of "Edit profile" */}
      {Object.keys(profile).length > 0 ? (
        <React.Fragment>
          {/* option:- Edit profile, Add Experience, Add Education  Link/Button */}
          <section>
            <div className="container">
              <div className="row">
                <div className="col">
                  <Link
                    to="/profiles/edit-profile"
                    className="btn btn-white text-teal btn-sm"
                  >
                    <i className="fa fa-user-cog" />
                    <span className="ml-1">Edit Profile</span>
                  </Link>
                  <Link
                    to="/profiles/add-experience"
                    className="btn btn-white text-teal btn-sm"
                  >
                    <i className="fa fa-user-tie" />
                    <span className="ml-1">Add Experience</span>
                  </Link>
                  <Link
                    to="/profiles/add-education"
                    className="btn btn-white text-teal btn-sm"
                  >
                    <i className="fa fa-graduation-cap" />
                    <span className="ml-1">Add Education</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Adding Experience Details */}
          <section>
            {/* ===== Checking experience array[...] has some data or not ======= */}
            {profile.experience.length > 0 && (
              <div className="container">
                <div className="row">
                  <div className="col">
                    <p className="h3 teal-text">Experience Details</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <table className="table table-hover text-center table-light table-striped">
                      <thead className="bg-teal text-white z-depth-2">
                        <tr>
                          <th>Title</th>
                          <th>Company</th>
                          <th>Location</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* ========= Since experience is an array[] ======== */}
                        {profile.experience.map((exp) => {
                          return (
                            // returns JSX with the key value, B'z  map() method alway's return a unique id
                            <tr key={exp._id}>
                              <td>{exp.title}</td>
                              <td>{exp.company}</td>
                              <td>{exp.location}</td>
                              <td>{exp.from}</td>
                              <td>{exp.to}</td>
                              <td>
                                {/* delete experience */}
                                <button
                                  onClick={clickDeleteExperience.bind(
                                    this,
                                    exp._id
                                  )}
                                  className="btn btn-danger btn-sm"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </section>
          {/* Adding Education Details */}
          <section>
            {/* ===== Checking experience array[...] has some data or not ======= */}
            {profile.education.length > 0 && (
              <div className="container">
                <div className="row">
                  <div className="col">
                    <p className="h3 teal-text">Education Details</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <table className="table table-hover text-center table-light table-striped">
                      <thead className="bg-teal text-white z-depth-2">
                        <tr>
                          <th>School</th>
                          <th>Degree</th>
                          <th>Field of Study</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* ========= Since experience is an array[] ======== */}
                        {profile.education.map((edu) => {
                          return (
                            // returns JSX with the key value, B'z  map() method alway's return a unique id
                            <tr key={edu._id}>
                              <td>{edu.school}</td>
                              <td>{edu.degree}</td>
                              <td>{edu.fieldOfStudy}</td>
                              <td>{edu.from}</td>
                              <td>{edu.to}</td>
                              <td>
                                {/* delete education */}
                                <button
                                  onClick={clickDeleteEducation.bind(
                                    this,
                                    edu._id
                                  )}
                                  className="btn btn-danger btn-sm"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </section>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* Option:- Don't have profile -> Create profile */}
          <section>
            <div className="container">
              <div className="row">
                <div className="col">
                  <small>
                    You don't have any profile yet, plz create one and share
                    with your own friends.
                  </small>{" "}
                  <br />
                  <div style={{ marginLeft: "10%" }}>
                    <Link
                      to="/profiles/create-profile"
                      className="btn btn-white text-teal btn-sm"
                    >
                      <i className="fa fa-user-cog p-2 rounded" />
                      Create Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
