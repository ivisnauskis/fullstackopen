import blogService from "../../services/BlogService";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_BLOG":
      return [...state, action.data];

    case "INIT_BLOGS":
      return action.data;

    default:
      return state;
  }
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch({
        type: "CREATE_BLOG",
        data: newBlog,
      });

      dispatch({
        type: "SET_NOTIFICATION",
        data: {
          message: `${newBlog.title} by ${newBlog.author} has been added`,
          success: true,
        },
      });
    } catch (err) {
      const message =
        err.response.status === 500
          ? "Unexpected error, try later."
          : err.response.data.error;

      dispatch({
        type: "SET_NOTIFICATION",
        data: {
          message,
          success: false,
        },
      });
    } finally {
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
    }
  };
};

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
