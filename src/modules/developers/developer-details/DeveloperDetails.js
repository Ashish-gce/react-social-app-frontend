import React, { useEffect } from "react";
//  access the 'history' instance used by React Router. Using the 'history instance' you can "redirect" users to another page
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as developerActions from "../../../redux/developers/developer.actions";
import * as developerReducer from "../../../redux/developers/developer.reducer"; // we read the state data
import Spinner from "../../../layout/misc/spinner/Spinner";

let DeveloperDetails = () => {
  let dispatch = useDispatch(); // action dispatch

  let developerInfo = useSelector((state) => {
    //   get state(data) from the store
    return state[developerReducer.developerFeatureKey];
  });

  let { loading, selectedProfile } = developerInfo;

  // console.log("@@@@@@@@@@@ Developer Details @@@@@@@@@@@@@@@@@@");
  // console.log(selectedProfile);

  // "developerId" -> by using this id we want to display the data of user-profile
  let developerId = useParams().developerId; // "useParams" -> to get the parameter from 'url'
  // console.log("******************  Developer Details ***********");
  // console.log(developerId);
  useEffect(() => {
    dispatch(developerActions.fetchDeveloper(developerId)); // fetching particular developer and keep them in the store
  }, [developerId]); // useEffect() -> [developerId] -> dependency takes an agr. to fetch the data

  return (
    <React.Fragment>
      {/* we've to check weather content is empty or not,  if empty -> Spinner and not empty -> display data */}
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {/* here again we've to check Object is there or not ? */}
          {Object.keys(selectedProfile).length > 0 && ( // "&&" -> represent if this is there then do this
            <React.Fragment>
              <section className="p-3">
                <div className="container">
                  <div className="row animated zoomIn">
                    <div className="col">
                      <p className="h3 text-teal">
                        <i className="fa fa-user-tie" />{" "}
                        {selectedProfile.user.name}'s Profile
                      </p>
                      <p>
                        A web developer is a programmer or a coder who
                        specializes in, or is specifically engaged in, the
                        development of World Wide Web applications using a
                        client–server model. The applications typically use
                        HTML, CSS and JavaScript in the client, PHP, ASP.NET
                        (C#), Python, Node.js, Go or Java in the server, and
                        http for communications between client and server.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div className="container bg-teal text-center text-white p-3">
                  <div className="row">
                    <div className="col">
                      <img
                        src={selectedProfile.user.avatar}
                        alt=""
                        width="200"
                        height="200"
                        // className="rounded-circle img-thumbnail"
                        className="rounded-circle profile-img"
                      />
                      <p className="h2">{selectedProfile.user.name}</p>
                      <p className="h6">{selectedProfile.designation}</p>
                      <p className="h6">{selectedProfile.company}</p>
                      <p>{selectedProfile.location}</p>
                      <div className="d-flex flex-row justify-content-center">
                        <div className="p-2">
                          <i className="fab fa-facebook" />
                        </div>
                        <div className="p-2">
                          <i className="fab fa-twitter" />
                        </div>
                        <div className="p-2">
                          <i className="fab fa-linkedin" />
                        </div>
                        <div className="p-2">
                          <i className="fab fa-youtube" />
                        </div>
                        <div className="p-2">
                          <i className="fab fa-instagram" />
                        </div>
                        <div className="p-2">
                          <i className="fab fa-whatsapp" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Developer's bio */}
                <div className="container">
                  <div className="row">
                    <div className="col text-center">
                      <div className="card my-2"></div>
                      <div className="card-body bg-light-grey text-teal">
                        <p className="h3">
                          {selectedProfile.user.name}'s Biography
                        </p>
                        <p>{selectedProfile.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Developer's skills */}
                <div className="container">
                  <div className="row mt-1">
                    <div className="col text-center">
                      <div className="card my-2">
                        <div className="card-body bg-light-grey text-teal">
                          <p className="h3">
                            {selectedProfile.user.name}'s Skills
                          </p>
                          {selectedProfile.skills.map((skill, index) => {
                            return (
                              <span
                                className="badge badge-dark p-2 m-2"
                                key={index}
                              >
                                {skill}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Developer's Education */}
                <div className="container">
                  <div className="row mt-1">
                    <div className="col-md-6">
                      {selectedProfile.education.length > 0 ? (
                        <React.Fragment>
                          <div className="card">
                            <div className="card-body bg-light-grey">
                              <p className="display-4">Education:- </p>
                              <ul className="list-group">
                                {selectedProfile.education.map((edu, index) => {
                                  return (
                                    <li
                                      className="list-group-item mt-2"
                                      key={edu._id}
                                    >
                                      <span>School: {edu.school}</span>
                                      <br />
                                      <span>Degree: {edu.degree}</span>
                                      <br />
                                      <span>
                                        FieldOfStudy: {edu.fieldOfStudy}
                                      </span>
                                      <br />
                                      <span>From: {edu.from}</span>
                                      <br />
                                      <span>To: {edu.to}</span>
                                      <br />
                                      <span>
                                        Education Description: {edu.description}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </React.Fragment>
                      ) : null}
                    </div>

                    {/* Developer Experience */}
                    <div className="col-md-6">
                      {selectedProfile.experience.length > 0 ? (
                        <React.Fragment>
                          <div className="card">
                            <div className="card-body bg-light-grey">
                              <p className="display-4">Experience:- </p>
                              <ul className="list-group">
                                {selectedProfile.experience.map(
                                  (exp, index) => {
                                    return (
                                      <li
                                        className="list-group-item mt-2"
                                        key={exp._id}
                                      >
                                        <span>Title: {exp.title}</span>
                                        <br />
                                        <span>Company: {exp.company}</span>
                                        <br />
                                        <span>Location: {exp.location}</span>
                                        <br />
                                        <span>From: {exp.from}</span>
                                        <br />
                                        <span>To: {exp.to}</span>
                                        <br />
                                        <span>
                                          Job Description: {exp.description}
                                        </span>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            </div>
                          </div>
                        </React.Fragment>
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DeveloperDetails;
