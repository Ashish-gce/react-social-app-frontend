import axios from "axios";
import * as userUtil from "../../util/userUtil";
import * as authUtil from "../../util/authUtil";
import * as alertActions from "../alert/alert.action";

//  🛠️ 🛕 action type -> post action
export const GET_ALL_POST_REQUEST = "GET_ALL_POST_REQUEST";
export const GET_ALL_POST_SUCCESS = "GET_ALL_POST_SUCCESS";
export const GET_ALL_POST_FAILURE = "GET_ALL_POST_FAILURE";

//  create a post action
export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

//  get particular / single post request
export const GET_POST_REQUEST = "GET_POST_REQUEST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAILURE = "GET_POST_FAILURE";

// delete a post request
export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

// like a post request
export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

// un-like a post request
export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

//  create a comment action
export const CREATE_COMMENT_REQUEST = "CREATE_COMMENT_REQUEST";
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE";

//  Delete a comment action
export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

//  get all posts
export const getAllPosts = () => {
  return async (dispatch) => {
    try {
      // below 3-line's code is a "token", b'z it is a PRIVATE action.
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: GET_ALL_POST_REQUEST });
        let dataurl = `/api/posts/`;
        let response = await axios.get(dataurl);

        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // console.log(response);

        // when we get successful 'response' then we do dispatch another action (SUCCESSFUL)
        dispatch({ type: GET_ALL_POST_SUCCESS, payload: response.data }); // 'response.data' -> we get a list of posts (posts: posts) receiving from 💻 server (postRouter.js)
        //  this "posts" we need to keep it in local-redux store
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_ALL_POST_FAILURE, payload: { error: error } }); // 'error-payload' -> comes from server (postRouter) - { error: [{ message: "error message" }] }
    }
  };
};

//  Create a post  ->  it takes 2-things (text, image) from the form that we entered -> see in 'postRouter'
export const createPost = (post) => {
  //  "post" ->  contains our localPost data (text, image)
  return async (dispatch) => {
    try {
      // below 3-line's code is a "token", b'z it is a PRIVATE action.
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: CREATE_POST_REQUEST });
        let dataurl = `/api/posts/`;
        let response = await axios.post(dataurl, post); // "post" -> sending form data

        // when we get successful 'response' then we do dispatch another action (SUCCESSFUL)
        dispatch({ type: CREATE_POST_SUCCESS, payload: response.data }); // 'response.data' -> we get a list of posts (post: post) receiving from 💻 server (postRouter.js)
        //  this "posts" we need to keep it in local-redux store
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: CREATE_POST_FAILURE, payload: { error: error } }); // 'error-payload' -> comes from server (postRouter) - { error: [{ message: "error message" }] }
    }
  };
};

//  get a post
export const getPost = (postId) => {
  // "postId" -> for get particular post
  return async (dispatch) => {
    try {
      // below 3-line's code is a "token", b'z it is a PRIVATE action.
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: GET_POST_REQUEST });
        let dataurl = `/api/posts/${postId}`;
        let response = await axios.get(dataurl);

        // when we get successful 'response' then we do dispatch another action (SUCCESSFUL)
        dispatch({ type: GET_POST_SUCCESS, payload: response.data }); // 'response.data' -> we get single post (post: post) receiving from 💻 server (postRouter.js) -> @usage : Create a new Post
        //  this "posts" we need to keep it in local-redux store
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_POST_FAILURE, payload: { error: error } }); // 'error-payload' -> comes from server (postRouter) - { error: [{ message: "error message" }] }
    }
  };
};

//  Delete a post  ->  it takes 1-things (postId) as an argument
export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      // below 3-line's code is a "token", b'z it is a PRIVATE action.
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: DELETE_POST_REQUEST });
        let dataurl = `/api/posts/${postId}`;
        let response = await axios.delete(dataurl, postId);

        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        console.log(response);

        dispatch({ type: DELETE_POST_SUCCESS, payload: response.data }); // 'response.data' -> we get a list of posts (post: post) receiving from 💻 server (postRouter.js)
        dispatch(alertActions.setAlert("Post is Deleted", "success"));
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: DELETE_POST_FAILURE, payload: { error: error } }); // 'error-payload' -> comes from server (postRouter) - { error: [{ message: "error message" }] }
    }
  };
};

//  like a post  ->  it takes 1-things (postId) as an argument
export const likePost = (postId) => {
  return async (dispatch) => {
    try {
      // below 3-line's code is a "token", b'z it is a PRIVATE action.
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: LIKE_POST_REQUEST });
        let dataurl = `/api/posts/like/${postId}`;
        let response = await axios.put(dataurl, postId);
        dispatch({ type: LIKE_POST_SUCCESS, payload: response.data }); // 'response.data' -> we get a list of posts (post: post) receiving from 💻 server (postRouter.js)
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: LIKE_POST_FAILURE, payload: { error: error } }); // 'error-payload' -> comes from server (postRouter) - { error: [{ message: "error message" }] }
    }
  };
};

//  unlike a post  ->  it takes 1-things (postId) as an argument
export const unlikePost = (postId) => {
  return async (dispatch) => {
    try {
      // below 3-line's code is a "token", b'z it is a PRIVATE action.
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: UNLIKE_POST_REQUEST });
        let dataurl = `/api/posts/unlike/${postId}`;
        let response = await axios.put(dataurl, postId);
        dispatch({ type: UNLIKE_POST_SUCCESS, payload: response.data }); // 'response.data' -> we get a list of posts (post: post) receiving from 💻 server (postRouter.js)
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: UNLIKE_POST_FAILURE, payload: { error: error } }); // 'error-payload' -> comes from server (postRouter) - { error: [{ message: "error message" }] }
    }
  };
};

//  Create a comment  ->  it takes 2-things (text, postId) from the form that we entered -> see in 'postRouter'
export const createComment = (comment, postId) => {
  // "postId" -> on which post we comment
  //  "comment" ->  comes locally from "PostDetails.js" file
  return async (dispatch) => {
    try {
      // below 3-line's code is a "token", b'z it is a PRIVATE action.
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: CREATE_COMMENT_REQUEST });
        let dataurl = `/api/posts/comment/${postId}`;
        let response = await axios.post(dataurl, comment); // "comment" -> sending form data

        // when we get successful 'response' then we do dispatch another action (SUCCESSFUL)
        dispatch({ type: CREATE_COMMENT_SUCCESS, payload: response.data }); // 'response.data' -> we get a list of posts (post: post) receiving from 💻 server (postRouter.js)
        //  this "comment" we need to keep it in local-redux store
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: CREATE_COMMENT_FAILURE, payload: { error: error } }); // 'error-payload' -> comes from server (postRouter) - { error: [{ message: "error message" }] }
    }
  };
};

//  Delete a comment  ->  it takes 2-things (postId, commentId) as an argument to identify on which post(postId) which person(commentId) commented
export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      // below 3-line's code is a "token", b'z it is a PRIVATE action.
      if (userUtil.isLoggedIn()) {
        let token = userUtil.getToken();
        authUtil.setAuthToken(token);

        dispatch({ type: DELETE_COMMENT_REQUEST });
        let dataurl = `/api/posts/comment/${postId}/${commentId}`;
        let response = await axios.delete(dataurl); // delete(...) takes arguments from the url.

        // when we get successful 'response' then we do dispatch another action (SUCCESSFUL)
        dispatch({ type: DELETE_COMMENT_SUCCESS, payload: response.data }); // 'response.data' -> we get a list of posts (post: post) receiving from 💻 server (postRouter.js)
        //  this "comment" we need to keep it in local-redux store
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: DELETE_COMMENT_FAILURE, payload: { error: error } }); // 'error-payload' -> comes from server (postRouter) - { error: [{ message: "error message" }] }
    }
  };
};
