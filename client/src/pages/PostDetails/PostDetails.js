import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { BiArrowBack } from "react-icons/bi";
import Modal from "@material-ui/core/Modal";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TextareaAutosize } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material";
import { addDemand } from "../../JS/actions/demand";
import { getpost } from "../../JS/actions/post";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CommentList from "./../CommentList/CommentList";
import DemandList from "./../DemandList/DemandList";
import "./PostDetails.css";

const theme = createTheme({
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

const styles = {
  position: "absolute",
  top: 28,
  right: 0,
  left: 0,
  zIndex: 1,
  border: "1px rgba(50, 50, 93, 0.25) solid",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  p: 1,
  bgcolor: "background.paper",
  width: "400px",
  height: "50vh",
  overflowY: "auto",
};

const PostDetails = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openListenerComment, setOpenListenerComment] = useState(false);
  const [openListenerDemand, setOpenListenerDemand] = useState(false);
  const [demand, setDemand] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const profile = useSelector((state) => state.profileReducer.profile);
  const post = useSelector((state) => state.postReducer.post);
  const loadPost = useSelector((state) => state.postReducer.isLoad);
  const errorPost = useSelector((state) => state.postReducer.isError);

  const handleCommentShow = () => {
    setOpenListenerComment((prev) => !prev);
  };

  const handleDemandShow = () => {
    setOpenListenerDemand((prev) => !prev);
  };

  const handleClickAwayComment = () => {
    setOpenListenerComment(false);
  };

  const handleClickAwayDemand = () => {
    setOpenListenerDemand(false);
  };

  //open the model that contains the commment content
  const handleOpen = () => {
    setOpen(true);
  };
  //close the model that contains the commment content
  const handleClose = () => {
    setOpen(false);
  };
  //send demand
  const handleDemandChange = (e) => {
    setDemand({ ...demand, [e.target.name]: e.target.value });
  };

  const handleDemandClick = () => {
    dispatch(addDemand(post._id, demand));
  };

  useEffect(() => {
    dispatch(getpost(params.id));
  }, [dispatch, params.id]);

  const body = (
    <form style={modalStyle} className={classes.paper}>
      <TextareaAutosize
        class="form-control"
        name="content"
        minRows={3}
        placeholder="Add a demand"
        onChange={handleDemandChange}
      />
      <Button
        onClick={() => {
          handleDemandClick();
          handleClose();
        }}
      >
        <SendIcon color="primary" />
      </Button>
    </form>
  );

  return (
    <ThemeProvider theme={theme}>
      <Button size="large" onClick={() => history.goBack()}>
        <BiArrowBack className="icons" />
      </Button>
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
      ) : (
        <>
          <div className="post-details-container">
            <h3>{post && post.title}</h3>
            <div className="post-details-header">
              <p>
                <CategoryOutlinedIcon color="primary" />
                {post && post.category}
              </p>
              <p>
                <RoomOutlinedIcon color="primary" />
                {post && post.location}
              </p>
              <p>
                <HelpOutlineOutlinedIcon color="primary" />
                {post && post.isLost ? "Lost" : "Found"}
              </p>
              <p>
                {post && post.date.split("T")[0].replace("-", "/")}
                <AccessTimeIcon color="primary" />
                {post && post.date.slice(11, 16)}
              </p>
            </div>
            <div className="post-details-container-column">
              <div className="post-details-content">
                <div className="buttons">
                  <ClickAwayListener onClickAway={handleClickAwayComment}>
                    <Box
                      sx={{
                        position: "relative",
                        border: "none",
                      }}
                    >
                      <Button onClick={handleCommentShow} color="primary">
                        Comments
                      </Button>
                      {openListenerComment ? (
                        <Box sx={styles}>
                          <CommentList />
                        </Box>
                      ) : null}
                    </Box>
                  </ClickAwayListener>
                  <ClickAwayListener onClickAway={handleClickAwayDemand}>
                    <Box
                      sx={{
                        position: "relative",
                        border: "none",
                      }}
                    >
                      {/* <Button color="primary" onClick={handleDemandShow}>
                        Demands
                      </Button> */}
                      {openListenerDemand ? (
                        <Box sx={styles}>
                          <DemandList />
                        </Box>
                      ) : null}
                    </Box>
                  </ClickAwayListener>
                </div>
                <div className="post-details-creator-content">
                  <div
                    style={{
                      margin: "0 25%",
                      display: "inline-block",
                    }}
                  >
                    <Link to={`/profile/${post && post.creator._id}`}>
                      <img
                        src={
                          post &&
                          post.creator._id === profile &&
                          profile.owner._id
                            ? `/uploads/${profile && profile.profilePic}`
                            : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                        }
                        alt="profilePic"
                        style={{
                          width: "3em",
                          height: "3em",
                          borderRadius: "50%",
                        }}
                      />
                      <span>{post && post.creator.username}</span>
                    </Link>
                    <TextsmsIcon color="primary" onClick={handleOpen} />
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      {body}
                    </Modal>
                  </div>
                  <p
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {post && post.content}
                  </p>
                </div>
              </div>
              <div className="post-details-image-container">
                <img
                  src={
                    post && post.postImage
                      ? `/uploads/${post && post.postImage}`
                      : post && !post.postImage && post && post.isLost
                      ? "/assets/lost_found/lost.png"
                      : "/assets/lost_found/found.png"
                  }
                  alt={post && post.postImage ? "postImage" : "..."}
                  style={{ width: "20em", height: "15em",paddingBottom: '19px',
                  borderRadius: '55px' }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </ThemeProvider>
  );
};

export default PostDetails;
