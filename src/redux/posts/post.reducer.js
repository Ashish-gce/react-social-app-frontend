import * as postActions from "./post.actions";

//  feature key
export const postsFeatureKey = "post-info";

// initial state
let initialState = {
  loading: false,
  posts: [], // store All posts -> in the form of an Array []
  selectedPost: {}, // store A single / particular user's posts -> in the form of an Object {}
  errorMessage: "",
};

// reducer function
export const reducer = (state = initialState, action) => {
  let { type, payload } = action; // fetch something- (type, payload) from 'action'
  switch (type) {
    // Get All Posts
    case postActions.GET_ALL_POST_REQUEST:
      return {
        ...state, // simply holds existing data as it-is in new state when some data goes changes
        loading: true,
      };
    case postActions.GET_ALL_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload.posts, // 'payload.posts' -> 💻 🖥️ server - postsRouter
      };
    case postActions.GET_ALL_POST_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error, // 'payload.error' -> also comes from  💻 server - postsTouter (error : error) -> "error" is an object
      };

    // Create a new post  ->  if we create a new post then that post should added with existing post array
    case postActions.CREATE_POST_REQUEST:
      return {
        ...state, // simply holds existing data as it-is in new state when some data goes changes
        loading: true,
      };
    case postActions.CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        //  😕😕😕  Note:- here we want to add a new post with existing post (posts -> is an array) 😕😕😕
        posts: [...state.posts, payload.post], // 'payload.post' data we get from the -> 💻 🖥️ server - postsRouter
      };
    case postActions.CREATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error, // 'payload.error' -> also comes from  💻 server - postsTouter (error : error) -> "error" is an object
      };

    // Get a post
    case postActions.GET_POST_REQUEST:
      return {
        ...state, // simply holds existing data as it-is in new state when some data goes changes
        loading: true,
      };
    case postActions.GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedPost: payload.post, // 'payload.posts' -> 💻 🖥️ server - postsRouter
      };
    case postActions.GET_POST_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error, // 'payload.error' -> also comes from  💻 server - postsTouter (error : error) -> "error" is an object
      };

    // Delete a post
    case postActions.DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case postActions.DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        // remove the post from the -> post[] array  AND  getting remaining posts
        posts: state.posts.filter((post) => post._id !== payload.post._id),
        // posts: state.posts.splice(
        //   (posts.findIndex((post) => post._id !== payload.post._id), 1)
        // ),
        // posts: [...state.posts, payload.post],
      };
    case postActions.DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };

    // Like a post
    case postActions.LIKE_POST_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case postActions.LIKE_POST_SUCCESS:
      let likedPosts = state.posts.map((post) => {
        if (post._id === payload.post._id) {
          return payload.post;
        } else {
          return post;
        }
      });
      return {
        ...state,
        loading: false,
        posts: [...likedPosts],
      };
    case postActions.LIKE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };

    // unlike a post
    case postActions.UNLIKE_POST_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case postActions.UNLIKE_POST_SUCCESS:
      let unLikedPost = state.posts.map((post) => {
        if (post._id === payload.post._id) {
          return payload.post;
        } else {
          return post;
        }
      });
      return {
        ...state,
        loading: false,
        posts: [...unLikedPost],
      };
    case postActions.UNLIKE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error,
      };

    // Create a new comment  ->  if we create a new comment then that comment should added with existing comment array
    case postActions.CREATE_COMMENT_REQUEST:
      return {
        ...state, // simply holds existing data as it-is in new state when some data get changes
        loading: true,
      };
    case postActions.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedPost: payload.post,
      };
    case postActions.CREATE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error, // 'payload.error' -> also comes from  💻 server - postsTouter (error : error) -> "error" is an object
      };

    // 🧴🧴🧴 delete comment  ->  🧴🧴🧴 NOTE:- 🧴🧴🧴 when we delete the comments then, we've to remove the comments from the -> comments[] array 🧴🧴🧴
    case postActions.DELETE_COMMENT_REQUEST:
      return {
        ...state, // simply holds existing data as it-is in new state when some data get changes
        loading: true,
      };
    case postActions.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        // remove the comments from the -> comments[] array
        selectedPost: payload.post,
      };
    case postActions.DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload.error, // 'payload.error' -> also comes from  💻 server - postsTouter (error : error) -> "error" is an object
      };

    //  👿👿👿 Very Imp.  b'z w/o default case we get error -> what happen's when no match happens
    default:
      return state;
  }
};
