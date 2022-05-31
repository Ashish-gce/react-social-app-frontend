import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // useDispatch() we use to dispatch an action to the store
import * as developerActions from "../../../redux/developers/developer.actions";
import * as developerReducer from "../../../redux/developers/developer.reducer";
import Spinner from "../../../layout/misc/spinner/Spinner";

let DeveloperList = () => {
  let dispatch = useDispatch(); //  use to dispatch an action to store

  // useSelector() -> get the data from the store and display them
  let developerInfo = useSelector((state) => {
    // useSelector() -> has a default arg.  "state" -> to access state info
    return state[developerReducer.developerFeatureKey];
  });
  let { loading, profiles } = developerInfo; // get data from db  and distructure them

  // console.log("###############  Developer Reducer  #################WWWWW");
  // console.log(profiles);

  //  we get data as soon as page is loded
  useEffect(() => {
    // dispatch an action  to  get data from server and keep them in the store
    dispatch(developerActions.fetchAllDevelopers());
  }, []); // [] -> dependency to dispatch an action only-one time  otherwise  keep-on action dispatch and fetching data

  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col">
              <p className="h3 text-teal">
                <i className="fa fa-user-tie" /> Developer
              </p>
              <p>
                A computer programmer, sometimes called a software developer, a
                programmer or more recently a coder (especially in more informal
                contexts), is a person who creates computer software. The term
                computer programmer can refer to a specialist in one area of
                computers or to a generalist who writes computer programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* developer card section start */}
      <section>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {profiles.length > 0 ? (
              <React.Fragment>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      {/* we want to loop multiple cards */}
                      {profiles.map((profile) => {
                        return (
                          <div
                            className="card my-2 animated zoomInDown"
                            key={profile._id}
                          >
                            <div className="card-body bg-light-grey z-depth-2">
                              <div className="row">
                                <div className="col-md-2">
                                  <img
                                    src={profile.user.avatar}
                                    className="img-fluid img-thumbnail"
                                    alt=""
                                  />
                                </div>
                                <div className="col-md-5">
                                  <h4>{profile.user.name}</h4>
                                  <small className="h5">
                                    {profile.designation}
                                  </small>
                                  <br />
                                  <small className="h6">
                                    {profile.company}
                                  </small>
                                  <br />
                                  <small>{profile.location}</small>
                                  <br />
                                  {/* "{`/developers/${profile._id}`}" -> this link provides the particular profile when we click on particular  "view profile" dynamically */}
                                  <Link
                                    to={`/developers/${profile._id}`}
                                    className="btn btn-teal btn-sm"
                                  >
                                    view Profile
                                  </Link>
                                </div>
                                <div className="col-md-5">
                                  {profile.skills.length > 0 &&
                                    profile.skills.map((skill, index) => {
                                      return (
                                        <div key={index}>
                                          <span className="badge badge-success p-2 mb-1">
                                            <i className="fa fa-check-circle" />
                                            {skill}
                                          </span>
                                          <br />
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
};

export default DeveloperList;
