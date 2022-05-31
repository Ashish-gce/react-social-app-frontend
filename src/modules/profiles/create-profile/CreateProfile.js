import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../layout/misc/spinner/Spinner";
import * as profileActions from "../../../redux/profiles/profile.action";
import * as profileReducer from "../../../redux/profiles/profile.reducer";

let CreateProfile = () => {
  let dispatch = useDispatch(); // for dispatching action
  let navigate = useNavigate(); // for navigation purpose  useHistory() -> useNavigate()

  // taking 'useState' to manage our profile locally and then at submitting time send to the REDUX and store there
  let [profile, setProfile] = useState({
    company: "",
    website: "",
    location: "",
    designation: "",
    skills: "",
    bio: "",
    githubusername: "",
    youtube: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  });

  //  "reading" data i.e. coming from from the STORE (dispatching an action) -> useEffect(() =>{  dispatch(...)  })
  let profileInfo = useSelector((state) => {
    return state[profileReducer.profileFeatureKey];
  });

  // we want to get data as soon as page is load
  useEffect(() => {
    dispatch(profileActions.getProfile); // dispatch an action to get the profile

    //  here updating / binding  data to localProfile.designation  onChange={updateInput}store  ❓❓❓❓ How we can change localProfile.designation  onChange={updateInput}❓❓❓❓
    setProfile({
      company: profile.company ? profile.company : "",
      website: profile.website ? profile.website : "",
      location: profile.location ? profile.location : "",
      designation: profile.designation ? profile.designation : "",
      skills: profile.skills ? profile.skills : "",
      bio: profile.bio ? profile.bio : "",
      githubusername: profile.githubusername ? profile.githubusername : "",
      // we can also do like this
      youtube: profile && profile.social?.youtube ? profile.social.youtube : "",
      facebook:
        profile && profile.social?.facebook ? profile.social.facebook : "",
      twitter: profile && profile.social?.twitter ? profile.social.twitter : "",
      linkedin:
        profile && profile.social?.linkedin ? profile.social.linkedin : "",
      instagram:
        profile && profile.social?.instagram ? profile.social.instagram : "",
    });
  }, []);

  // ❓❓ here update input fields locally by user's ❓❓
  let updateInput = (event) => {
    setProfile({
      ...profile, // keep hold of existing data and modify remaining data if changes happen
      [event.target.name]: event.target.value,
    });
  };

  let submitCreateProfile = (e) => {
    e.preventDefault();
    //  dispatch an action for submiting a form  && navigation to the server
    // ♻️♻️♻️ In order to passing parameter with action method, we want to use them during perform 'action' -> profile.Action.js -> "UPDATE_PROFILE_SUCCESS"
    dispatch(profileActions.createProfile(profile, navigate)); // "navigate" we send to  "profile.Action" file as a parameter -> after profileUpdation redirect edit-profile page to "dashboard" page
  };
  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(profile)}</pre> */}
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-teal">
                {" "}
                <i className="fa fa-user-circle" />{" "}
                <span className="ml-1">Create a Profile</span>
              </p>
              <p>
                Wikis are great sites dedicated to either a specific topic or
                collection of topics. Sometimes you may come across that your
                niche hobby or interest isn't well-represented in the wiki
                community. Fortunately, you can remedy this by creating your
                own, and then let other users across the Web edit the wiki to
                help you out.
              </p>
            </div>
          </div>
        </div>
      </section>

      <React.Fragment>
        <section className="container">
          <div className="row">
            <div className="col-md-8">
              <form onSubmit={submitCreateProfile}>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    name="company"
                    value={profile.company}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Company"
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    name="website"
                    value={profile.website}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Website"
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Location"
                  />
                </div>
                <div className="form-group">
                  <select
                    required
                    className="form-control"
                    name="designation"
                    value={profile.designation}
                    onChange={updateInput}
                  >
                    <option value="">Select Designation</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Tech Lead">Tech Lead</option>
                    <option value="Junior Manager">Junior Manager</option>
                    <option value="Senior Managaer">Senior Managaer</option>
                    <option value="Project Director">Project Director</option>
                    <option value="Manaiging Director">
                      Manaiging Director
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    name="skills"
                    value={profile.skills}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Skills"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    required
                    rows="3"
                    name="bio"
                    value={profile.bio}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Job-Description / Biography"
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    name="githubusername"
                    value={profile.githubusername}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Github-Username"
                  />
                </div>
                <hr />

                <small className="text-teal">Social Media Links</small>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    name="youtube"
                    value={profile.youtube}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="YouTube"
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="LinkedIn"
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    name="twitter"
                    value={profile.twitter}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Twitter"
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    name="facebook"
                    value={profile.facebook}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Facebook"
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    name="instagram"
                    value={profile.instagram}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Instagram"
                  />
                </div>

                <div>
                  <Link
                    to="/profiles/dashboard"
                    className="btn bg-light-grey btn-sm"
                  >
                    Back
                  </Link>
                  <span>
                    <input
                      type="submit"
                      className="btn btn-teal btn-sm float-right"
                      value="Create Profile"
                    />
                  </span>
                </div>
              </form>
            </div>
          </div>
        </section>
      </React.Fragment>
    </React.Fragment>
  );
};

export default CreateProfile;
