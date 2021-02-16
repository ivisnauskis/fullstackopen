import blogService from "../../services/BlogService";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_BLOG":
      return [...state, { ...action.data }];

    case "INIT_BLOGS":
      return [...action.data];

    default:
      return state;
  }
};

// export const createBlog = (blog) => {
//   return async (dispatch) => {
//     const newBlog = await ;
//   }
// }

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs.sort((a, b) => b.likes - a.likes),
    });
  };
};

export default reducer;
