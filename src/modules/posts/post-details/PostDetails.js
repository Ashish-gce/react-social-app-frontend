import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../../layout/misc/spinner/Spinner";
import * as postActions from "../../../redux/posts/post.actions";
import * as postReducer from "../../../redux/posts/post.reducer";
// 👍 💯 "LOGGED_IN" Person -> {User's information}, person that made this Discussion ->  So, details (text, image) came 👍 💯
import * as userReducer from "../../../redux/users/userReducer";

let PostDetails = () => {
  let [comment, setComment] = useState({
    text: "",
  });

  let dispatch = useDispatch();
  //  // 🔬🔬🔬 "postId" ?  ->  b'z in 'App.js' we made navigation for  <PostDetails /> 👿 path="/posts/:postId" 👿 for particular post 🔬🔬🔬
  let postId = useParams().postId; // fetch particular 'Id' from url

  let postInfo = useSelector((state) => {
    return state[postReducer.postsFeatureKey];
  });

  let userInfo = useSelector((state) => {
    return state[userReducer.userFeatureKey];
  });

  let { user } = userInfo;

  let { loading, selectedPost } = postInfo;

  //  //  👿👿 🔬 🔬 To display the discussion data here a/c to user's click on particular discussion button
  //   we need to catch that discussion -> "Id" from 'url' and send them to the server and fetch a/c to that discussion-id -> details

  useEffect(() => {
    // dispatch an action to fetch a particular (single) postId details
    dispatch(postActions.getPost(postId));
  }, [postId]);

  // submitCreateComment()
  let submitCreateComment = (event) => {
    event.preventDefault();
    dispatch(postActions.createComment(comment, postId));
    setComment({
      text: "",
    });
  };

  // updateComment()
  let updateComment = (event) => {
    setComment({
      text: event.target.value,
    });
  };

  // Delete Comment
  let clickDeleteComment = (commentId) => {
    dispatch(postActions.deleteComment(postId, commentId)); //  "postId" and "commentId" we get from url
  };

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <Link to="/posts/list" className="btn bg-light-grey btn-sm">
                    Back
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {Object.keys(selectedPost).length > 0 && (
                    <div className="card">
                      <div className="card-body bg-light-grey">
                        <div className="row">
                          <div className="col-md-2 text-center">
                            <img // belongs to the person who made the 'post'
                              src={selectedPost.avatar}
                              alt=""
                              className="rounded-circle"
                              height="70"
                              width="70"
                            />{" "}
                            <br />
                            <small>{selectedPost.name}</small>
                          </div>
                          <div className="col-md-8">
                            {/* 🖊️🖊️🖊️ who made the post -> image of the post (post ka image)  */}
                            <div className="row mb-1">
                              <div className="col-md-6 m-auto d-block rounded img-thumbnail">
                                <img
                                  src={selectedPost.image}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                            <p>{selectedPost.text}</p> <br />
                            <small>{selectedPost.createdAt}</small>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col">
                            {/*  👍 💯 Who is the person making this Discussion -> "LOGGED_IN" Person -> {User's information} So, below that's details (text, image) came 👍 💯  */}
                            <form onSubmit={submitCreateComment}>
                              {/*  Taking Input group */}
                              <div className="input-group mb-1 ">
                                <div className="input-group-prepend">
                                  {/*  placing profile picture -> who is logged-in (person)  */}
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    <img
                                      src={user.avatar} // coming from "loggedIn-person" info -> userReducer
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
                                  value={comment.text}
                                  onChange={updateComment}
                                  rows="3"
                                  className="form-control"
                                  placeholder="What's in your mind..."
                                />
                              </div>
                              <div>
                                <input
                                  type="submit"
                                  className="btn btn-teal btn-sm"
                                  value="Comment"
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* here we're loop through the whole (list of) comments that is commented on the particular post */}
          <section>
            {/* ♻️ v.v.v...  We need to apply condition, if we've an object then */}
            {/* ♻️ How to check object's length  &&  also length of any object that present inside object  */}
            {Object.keys(selectedPost).length > 0 &&
              selectedPost.comments.length > 0 && (
                <div className="container">
                  <div className="row">
                    <div className="col">
                      {selectedPost.comments.map((comment) => {
                        return (
                          <div className="card mt-3" key={comment._id}>
                            <div className="card-body">
                              {/* which person made the comment */}
                              <div className="row">
                                <div className="col-md-2">
                                  <img
                                    src={comment.avatar}
                                    alt=""
                                    className="rounded-circle"
                                    width="60"
                                    height="60"
                                  />{" "}
                                  <br />
                                  <small>{comment.name}</small>
                                </div>
                                <div className="col-md-8">
                                  <p>{comment.text}</p>

                                  {/*  Comment delete button only display -> when  'comment user_id'(any user can comment on any post) === 'loggedIn user_id'  */}
                                  {/*  Every user can delete it's own post not other post  */}
                                  {comment.user === user._id ? (
                                    <button
                                      className="btn rgba-red-light btn-sm"
                                      onClick={clickDeleteComment.bind(
                                        this,
                                        comment._id
                                      )}
                                    >
                                      <i className="fa fa-times-circle" />{" "}
                                      Delete
                                    </button>
                                  ) : null}
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
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PostDetails;
