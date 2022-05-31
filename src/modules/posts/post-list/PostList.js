import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinnner from "../../../layout/misc/spinner/Spinner";
import * as userReducer from "../../../redux/users/userReducer";
import * as postActions from "../../../redux/posts/post.actions";
import * as postReducer from "../../../redux/posts/post.reducer";

let PostList = () => {
  //  //  creating local state for form-binding and state management and after 'submit' send to the backend - server side
  let [localPost, setLocalPost] = useState({
    text: "",
    image: "",
  });

  let dispatch = useDispatch(); // -> dispatch an action to action

  //  //  here we fetch user-info  to display 'loading',  'name'  and  'image'
  let userInfo = useSelector((state) => {
    return state[userReducer.userFeatureKey];
  });

  let { user } = userInfo;

  // fetching post-info from  'postReduver' to display them
  let postInfo = useSelector((state) => {
    return state[postReducer.postsFeatureKey];
  });

  let { loading, posts } = postInfo; // loading -> display <spinner />  otherwise -> display post content

  // useEffect() -> dispatch an action when  ->  as-soon-as page loads
  useEffect(() => {
    dispatch(postActions.getAllPosts()); // fetching all posts  and  keep them in store
  }, []); // [] -> dependency which means one-time request fetching not unlimited-times

  //  //  updateInput() form-binding
  let updateInput = (event) => {
    setLocalPost({
      ...localPost,
      [event.target.name]: event.target.value,
    });
  };

  //  //  submit create post -> submitCreatePost()
  let submitCreatePost = (event) => {
    event.preventDefault();
    dispatch(postActions.createPost(localPost));
    //  after action dispatch we set empty / clear the fields
    setLocalPost({
      text: "",
      image: "",
    });
  };

  // Delete a particular post
  let clickDeletePost = (postId) => {
    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    // console.log(postId);
    dispatch(postActions.deletePost(postId));
  };

  // like a post
  let clickLikepost = (postId) => {
    dispatch(postActions.likePost(postId));
  };

  // unlike a post
  let clickUnLikepost = (postId) => {
    dispatch(postActions.unlikePost(postId));
  };

  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(localPost)}</pre> */}
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-teal">Welcome to React-Social Community</p>
              <p>
                React Hooks can be a powerful addition to your application,
                however, implementing authentication and authorization on your
                own can still be tricky. Thanks to Auth0, you can implement it
                mostly out-of-the-box with just a little effort from your side!
                Auth0 is a managed authentication platform that provides
                connections to all of the major social media logins such as
                Twitter, Google, and Facebook.
              </p>
            </div>
          </div>
          <div className="row">
            {/*  😖 😕 condition:-  if user is not empty then we display below info */}
            {
              //  //  👿 if this  'Object.keys(user).length > 0'  && -> then  this happen
              Object.keys(user).length > 0 && (
                <div className="col-md-8">
                  {/*  🏣 🏣 🏣  Create a new post for form submission  */}
                  <form onSubmit={submitCreatePost}>
                    {/*  Taking Input group */}
                    <div className="input-group mb-1 ">
                      <div className="input-group-prepend">
                        {/*  placing profile picture -> who is logged-in (person)  */}
                        <span className="input-group-text" id="basic-addon1">
                          <img
                            src={user.avatar}
                            alt=""
                            height="60"
                            width="60"
                            className="rounded-circle"
                          />
                        </span>
                      </div>
                      <textarea
                        required
                        name="text"
                        value={localPost.text}
                        onChange={updateInput}
                        rows="3"
                        className="form-control"
                        placeholder="What's in your mind..."
                      />
                    </div>

                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          Image Url
                        </span>
                      </div>
                      <input
                        required
                        name="image"
                        value={localPost.image}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Image Url"
                      />
                    </div>
                    <div>
                      <input
                        type="submit"
                        className="btn btn-teal btn-sm"
                        value="Post"
                      />
                    </div>
                  </form>
                </div>
              )
            }
          </div>
          <hr /> {/*  To seperate create post and  display all other post  */}
        </div>
      </section>

      {/*  🏝️ 🏊 Another section to display all the post posted by user's  */}
      <section>
        {loading ? (
          <Spinnner />
        ) : (
          <React.Fragment>
            {posts.length > 0 && (
              <div className="container">
                <div className="row">
                  <div className="col">
                    {posts.map((post) => {
                      return (
                        <div className="card my-2" key={post._id}>
                          <div className="card-body bg-light-grey">
                            {/* here display image who made the comment's  ->  only logged person, everyone who comments */}

                            <div className="row">
                              {/* for image -> who made this post */}
                              <div className="col-md-2  d-flex flex-column align-items-center justify-content-center">
                                <img
                                  src={post.avatar}
                                  alt=""
                                  className="rounded-circle"
                                  width="70"
                                  height="70"
                                />{" "}
                                <br />
                                {/*  name -> who made the post  */}
                                <small className="lead font-weight-bold text-teal font-italic">
                                  {post.name}
                                </small>
                              </div>

                              {/* for content */}
                              <div className="col-md-8">
                                {/* 🖊️🖊️🖊️ who made the post -> image of the post (post ka image)  */}
                                <div className="row mb-1">
                                  <div className="col-md-6 m-auto d-block rounded img-thumbnail">
                                    <img
                                      src={post.image}
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </div>
                                </div>
                                {/*  🖊️🖊️🖊️🖊️🖊️ Make the post 🖊️🖊️🖊️🖊️🖊️  */}
                                <p>{post.text}</p>
                                <small>{post.createdAt}</small>
                                <br />
                                <button
                                  className="btn rgba-green-light btn-sm"
                                  onClick={clickLikepost.bind(this, post._id)}
                                >
                                  <i className="fa fa-thumbs-up" />
                                  {post.likes.length}
                                </button>
                                <button
                                  className="btn rgba-red-light btn-sm"
                                  onClick={clickUnLikepost.bind(this, post._id)}
                                >
                                  <i className="fa fa-thumbs-down" />
                                </button>
                                <Link
                                  to={`/posts/${post._id}`}
                                  className="btn rgba-blue-light btn-sm"
                                >
                                  <i className="fab fa-facebook-messenger" />
                                  Discussion {post.comments.length}
                                </Link>

                                {/* ========= 😕😕😕😕😕😕😕  Note:- Post only can be deleted by person "who" made the post or he can delete his own post  ->  not post deleted which id made by other person  😕😕😕😕😕😕😕 ========= */}
                                {/*  post-deletion 'button' show only his own created post, delete-button not display on other person post  */}
                                {/*  CONDITION: ->  Post creation person === loggedIn person should same.  = => since, every post has a user -> user_id  &&  every loggedIn person has an Id -> logIn_id  */}
                                {/* {isAuthorized.bind(this, post) && (
                                  <button className="btn rgba-amber-light btn-sm">
                                    <i className="fa fa-times-circle" />
                                  </button>
                                )} */}

                                {/* 'post.user' -> person who made the post, 'user._id' -> logged person id  */}
                                {post.user === user._id ? (
                                  <button
                                    className="btn rgba-amber-light btn-sm"
                                    onClick={clickDeletePost.bind(
                                      this,
                                      post._id
                                    )}
                                  >
                                    <i className="fa fa-times-circle" /> Delete
                                  </button>
                                ) : null}

                                {/* {post.user === user._id ? (
                                  <button
                                    className="btn rgba-amber-light btn-sm"
                                    onClick={clickDeletePost.bind(
                                      this,
                                      👿👿👿 post._Id 👿👿👿
                                    )}
                                  >
                                    <i className="fa fa-times-circle" /> Delete
                                  </button>
                                )  */}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
};

export default PostList;
