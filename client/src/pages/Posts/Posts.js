import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../../components/PostCard/PostCard";
import Filter from "./../../components/Filter/Filter";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E90128",
    },
  },
});

const Posts = () => {
  const [filter, setFilter] = useState("All");
  const posts = useSelector((state) => state.postReducer.posts);
  const loadPost = useSelector((state) => state.postReducer.isLoad);
  const errorPost = useSelector((state) => state.postReducer.isError);
  return (
    <ThemeProvider theme={theme}>
      {/* <Maps location={location} zoomLevel={8} /> */}
      <div className="visitor-box">
        <Filter setFilter={setFilter} filter={filter} />
      </div>
      {loadPost ? (
        <div className="loading">
          <CircularProgress color="primary" size={100} />
        </div>
      ) : errorPost ? (
        <div className="error-data">
          <img
            src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/data_error.png"
            alt="error"
          />
        </div>
      ) : !posts.length ? (
        <h2 className="error-post">There is no post!</h2>
      ) : (
        <div className="posts">
          {filter === "All"
            ? posts
                .map((el) => <PostCard post={el} key={el._id} />)
                .sort((a, b) => (a.date > b.date && 1) || -1)
                .slice(0, 7)
            : filter === "Lost"
            ? posts
                .filter((post) => post.isLost === true)
                .map((el) => <PostCard post={el} key={el._id} />)
                .sort((a, b) => (a.date > b.date && 1) || -1)
                .slice(0, 7)
            : posts
                .filter((post) => post.isLost === false)
                .map((el) => <PostCard post={el} key={el._id} />)
                .sort((a, b) => (a.date > b.date && 1) || -1)
                .slice(0, 7)}
        </div>
      )}
    </ThemeProvider>
  );
};

export default Posts;
