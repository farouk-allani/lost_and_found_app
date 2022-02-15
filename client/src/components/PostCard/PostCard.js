import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@material-ui/core/Typography";
import { TextareaAutosize } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Modal from "@material-ui/core/Modal";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { GoComment } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { changePostToResolved, deletePost } from "../../JS/actions/post";
import { addComment } from "./../../JS/actions/comment";
import "./PostCard.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
    minWidth: 250,
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

const PostCard = ({ post }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState({});
  const [isResolved, setIsResolved] = useState(false);
  const user = useSelector((state) => state.userReducer.user);
  const postState = useSelector((state) => state.postReducer.post);
  const dispatch = useDispatch();

  ////open the model that contains the commment content
  const handleOpen = () => {
    setOpen(true);
  };
  //close the model that contains the commment content
  const handleClose = () => {
    setOpen(false);
  };

  //Write a comment
  const handleCommentChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  //Add a comment on click
  const handleCommentClick = () => {
    dispatch(addComment(post._id, comment));
  };
  //Delete post on click on the icon
  const handlePostDelete = () => {
    let del = window.confirm("Are you sure to delete this post!");
    if (del) {
      dispatch(deletePost(post._id));
    }
  };
  //change post to resolved
  const handlePostToResolved = () => {
    let resolved = window.confirm("Are you sure to change the post's status");
    if ((post.creator === user._id || user.role === "admin") && resolved) {
      dispatch(changePostToResolved(post._id, post));
      setIsResolved(isResolved);
    } else {
      alert("You are not authorized to change the status!");
    }
  };

  useEffect(() => {
    setIsResolved(postState && postState.isResolved);
  }, [postState]);

  const body = (
    <form style={modalStyle} className={classes.paper}>
      <TextareaAutosize
        class="form-control"
        name="content"
        placeholder={"Add a comment"}
        onChange={handleCommentChange}
      />
      <Button
        onClick={() => {
          handleCommentClick();
          handleClose();
        }}
      >
        <SendIcon color="primary" style={{ color: "#E90128" }} />
      </Button>
    </form>
  );
  return (
    <ThemeProvider theme={themema}>
      <div className="post">
        <Card className={classes.root}>
          <Link to={`/post/${post._id}`}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                image={
                  post.postImage
                    ? `/uploads/${post.postImage}`
                    : !post.postImage && post.isLost
                    ? "/assets/lost_found/lost.png"
                    : "/assets/lost_found/found.png"
                }
                resolved="post"
              />

              <CardContent className={post.isDone ? "done" : "undone"}>
                <Typography gutterBottom variant="h5" component="h2">
                  Title:{post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Posted at:
                  {post.createdAt.split("T")[0].replace("-", "/")}_
                  {post.createdAt.slice(11, 16)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor: "#F0F8FF",
            }}
          >
            <Link to={`/post/${post._id}`}>
              <VisibilityIcon color="primary" style={{ color: "#E90128" }} />
            </Link>
            <span>
              <GoComment
                color="primary"
                size={25}
                style={{ color: "#E90128" }}
                onClick={handleOpen}
              />
            </span>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
            {post.creator === user._id ? (
              <>
                <Link to={`/post/edit/${post._id}`}>
                  <EditOutlinedIcon
                    color="primary"
                    style={{ color: "#E90128" }}
                  />
                </Link>
                <DeleteForeverOutlinedIcon
                  color="primary"
                  style={{ color: "#E90128" }}
                  onClick={handlePostDelete}
                />
              </>
            ) : null}
            <FormControlLabel
              control={
                <Checkbox
                  style={{ color: "#E90128" }}
                  checked={post.isResolved}
                  onChange={handlePostToResolved}
                  name="checked"
                  color="primary"
                />
              }
              label="Resolved"
            />
          </CardActions>
        </Card>
      </div>
    </ThemeProvider>
  );
};
export default PostCard;
