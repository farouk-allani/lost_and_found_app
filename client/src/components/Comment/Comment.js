import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../JS/actions/comment";
import { CircularProgress } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import SendIcon from "@mui/icons-material/Send";
import { TextareaAutosize } from "@material-ui/core";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Comment.css";

const themema = createTheme({
  palette: {
    primary: {
      main: "#E90128",
    },
  },
});

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid transparent",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
  },
  margin: {
    margin: theme.spacing.unit,
  },
  media: {
    height: 150,
  },
}));

const Comment = ({ comment }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [commentstate, setCommentstate] = useState(comment);
  const user = useSelector((state) => state.userReducer.user);
  const loadComment = useSelector((state) => state.commentReducer.isLoad);
  const errorComment = useSelector((state) => state.commentReducer.isError);
  const dispatch = useDispatch();
  const params = useParams();
  //Delete comment on click on the icon
  const handleCommentDelete = () => {
    let del = window.confirm("Are you sure to delete this comment!");
    if (del) {
      dispatch(deleteComment(comment._id, params.id));
    }
  };

  //Edit comment on click on the icon
  const handleCommentEdit = () => {
    dispatch(updateComment(comment._id, params.id, commentstate));
  };

  ////open the model that contains the commment content
  const handleOpen = () => {
    setOpen(true);
  };
  //close the model that contains the commment content
  const handleClose = () => {
    setOpen(false);
  };
  const handleCommentChange = (e) => {
    setCommentstate({ ...commentstate, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setCommentstate(commentstate);
  }, [commentstate, comment._id]);

  const lastState = () => {
    setCommentstate(commentstate);
  };

  const body = (
    <form style={modalStyle} className={classes.paper}>
      <TextareaAutosize
        class="form-control"
        name="content"
        value={commentstate.content}
        onChange={handleCommentChange}
      />
      <Button
        onClick={() => {
          handleCommentEdit();
          handleClose();
        }}
      >
        <SendIcon color="primary" />
      </Button>
    </form>
  );

  return (
    <ThemeProvider theme={themema}>
      <div className="comment-container">
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
        ) : (
          <div className="comment">
            <div className="comment-edit-delete">
              {comment.creator._id === user._id ? (
                <DeleteForeverOutlinedIcon
                  color="primary"
                  onClick={handleCommentDelete}
                />
              ) : null}
              <small className="time">
                {comment.createdAt.split("T")[0].replace("-", "/")}
                <AccessTimeIcon color="primary" size="small" />
                {comment.createdAt.slice(11, 16)}
              </small>
              {comment.creator._id === user._id ? (
                <>
                  <EditOutlinedIcon
                    color="primary"
                    onClick={() => {
                      lastState();
                      handleOpen();
                    }}
                  />
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {body}
                  </Modal>
                </>
              ) : null}
            </div>
            <div className="comment-details">
              <p>{comment.content}</p>
              <Link to={`/profile/${comment.creator._id}`}>
                <small>Wrote by:{comment.creator.username}</small>
              </Link>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Comment;
