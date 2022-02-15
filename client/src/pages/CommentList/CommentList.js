import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../../components/Comment/Comment";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router";
import { getAllComments } from "./../../JS/actions/comment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import "./CommentList.css";
const themema = createTheme({
  palette: {
    primary: {
      main: "#E90128",
    },
  },
});

const CommentList = () => {
  const comments = useSelector((state) => state.commentReducer.comments);
  const loadComment = useSelector((state) => state.commentReducer.isLoad);
  const errorComment = useSelector((state) => state.commentReducer.isError);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getAllComments(params.id));
  }, [dispatch, params.id]);
  return (
    <ThemeProvider theme={themema}>
      {loadComment ? (
        <div className="loading">
          <CircularProgress color="primary" size={100} />
        </div>
      ) : errorComment ? (
        <div className="error-data">
          <img
            src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/data_error.png"
            alt="error"
          />
        </div>
      ) : !comments.length ? (
        <div className="error-list">
          <SpeakerNotesOffIcon style={{ fontSize: "200px" }} />
        </div>
      ) : (
        <div className="comments">
          {comments &&
            comments.map((el) => <Comment comment={el} key={el._id} />)}
        </div>
      )}
    </ThemeProvider>
  );
};

export default CommentList;
