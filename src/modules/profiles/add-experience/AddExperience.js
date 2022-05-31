// 🌉 🚌  "AddExperience" has one way traffic  =>=>=>  data send to the server only  not coming from the server

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as profileActions from "../../../redux/profiles/profile.action";

let AddExperience = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  // creating local state for current manage and at end / submiting time send to REDUX-STORE
  let [experience, setExperience] = useState({
    // Note:- 👿👿👿 below fields are case-sensitive So, we need to write / maintain as same as we write in ->  profile.js file
    //  b'z, same form data we reading from server 🖥️ 💻
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: "",
    description: "",
  });

  //  ❓❓❓ ❔❔ since, when we've  checkbox, then we need to deal with them seperately b'z ->  checkbox does not have any property like:- "value".
  //   ❓❓❓ ❔❔  it has  value ->  "checked" - true  "unchecked" - false
  let updateInput = (e) => {
    if (e.target.type === "checkbox") {
      setExperience({
        ...experience,
        [e.target.name]: e.target.checked,
      });
    } else {
      setExperience({
        ...experience,
        [e.target.name]: e.target.value,
      });
    }
  };

  // form submition action
  let submitAddExperience = (event) => {
    event.preventDefault();
    // dispatch( 👿 experience, 👿 navigate )
    // 👿 dispatching an action with data object (experience) && navigate -> for redirecting to  "Dashboard"  after object(data) submit to the server
    dispatch(profileActions.addExperience(experience, navigate));
  };
  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(experience)}</pre>{" "} */}
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-teal">
                <i className="fa fa-user-clock" />{" "}
                {/*  {" "} -> used to give "space"  */}
                <span>Add Experience</span>
              </p>
              <p className="text-teal">
                Experience refers to conscious events in general, more
                specifically to perceptions, or to the practical knowledge and
                familiarity that is produced by these conscious processes.
                Understood as a conscious event in the widest sense, experience
                involves a subject to which various items are presented. In this
                sense, seeing a yellow bird on a branch presents the subject
                with the objects "bird" and "branch", the relation between them
                and the property.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <form onSubmit={submitAddExperience}>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    Title
                  </span>
                  <input
                    required
                    name="title"
                    value={experience.title}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    Company
                  </span>
                  <input
                    required
                    name="company"
                    value={experience.company}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Company"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    Location
                  </span>
                  <input
                    required
                    name="location"
                    value={experience.location}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Location"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    From Date
                  </span>
                  <input
                    required
                    name="from"
                    value={experience.from}
                    onChange={updateInput}
                    type="date"
                    className="form-control"
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    name="current"
                    value={experience.current}
                    onChange={updateInput}
                    type="checkbox"
                    className="form-check-input"
                    id="checkBox1"
                  />
                  <label className="form-check-label" for="checkBox1">
                    Current
                  </label>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    To Date
                  </span>
                  <input
                    name="to"
                    value={experience.to}
                    onChange={updateInput}
                    type="date"
                    className="form-control"
                    // NOTE- ♻️ 💻 When we "select check-box" -> 'current' then we don't need to write  (disable -> 'To Date')  otherwise,  "enable" -> 'To Date' field
                    disabled={experience.current} // current checkbox value -> true
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    Job Description
                  </span>
                  <textarea
                    required
                    name="description"
                    value={experience.description}
                    onChange={updateInput}
                    rows="3"
                    className="form-control"
                    placeholder="Description"
                  />
                </div>
                <div>
                  <Link
                    to="/profiles/dashboard"
                    className="btn bg-light-grey btn-sm"
                  >
                    Back
                  </Link>
                  <input
                    type="submit"
                    value="add experience"
                    className="btn btn-teal btn-sm float-right"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AddExperience;
