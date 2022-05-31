import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as profileActions from "../../../redux/profiles/profile.action";

let AddEducation = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  // creating local state for current manage and at end / submiting time send to REDUX-STORE
  let [education, setEducation] = useState({
    // Note:- 👿👿👿 below fields are case-sensitive So, we need to write / maintain as same as we write in ->  profile.js file
    //  b'z, same form data we reading from server 🖥️ 💻
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: "",
    description: "",
  });

  //  ❓❓❓ ❔❔ since, when we've  checkbox, then we need to deal with them seperately b'z ->  checkbox does not have any property like:- "value".
  //   ❓❓❓ ❔❔  it has  value ->  "checked" - true  "unchecked" - false
  let updateInput = (e) => {
    if (e.target.type === "checkbox") {
      setEducation({
        ...education,
        [e.target.name]: e.target.checked,
      });
    } else {
      setEducation({
        ...education,
        [e.target.name]: e.target.value,
      });
    }
  };

  // form submition action
  let submitAddEducation = (event) => {
    event.preventDefault();
    // dispatch( 👿 experience, 👿 navigate )
    // 👿 dispatching an action with data object (experience) && navigate -> for redirecting to  "Dashboard"  after object(data) submit to the server
    dispatch(profileActions.addEducation(education, navigate));
  };
  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(experience)}</pre>{" "} */}
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-teal">
                <i className="fa fa-graduation-cap" />{" "}
                {/*  {" "} -> used to give "space"  */}
                <span>Add Education</span>
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
              <form onSubmit={submitAddEducation}>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    School
                  </span>
                  <input
                    required
                    name="school"
                    value={education.school}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="School"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    Degree
                  </span>
                  <input
                    required
                    name="degree"
                    value={education.degree}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Degree"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    FieldOfStudy
                  </span>
                  <input
                    required
                    name="fieldOfStudy"
                    value={education.fieldOfStudy}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="FieldOfStudy"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    From Date
                  </span>
                  <input
                    required
                    name="from"
                    value={education.from}
                    onChange={updateInput}
                    type="date"
                    className="form-control"
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    name="current"
                    value={education.current}
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
                    value={education.to}
                    onChange={updateInput}
                    type="date"
                    className="form-control"
                    // NOTE- ♻️ 💻 When we "select check-box" -> 'current' then we don't need to write  (disable -> 'To Date')  otherwise,  "enable" -> 'To Date' field
                    disabled={education.current} // current checkbox value -> true
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    Job Description
                  </span>
                  <textarea
                    required
                    name="description"
                    value={education.description}
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
                    value="add education"
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

export default AddEducation;
