import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  deleteProfile,
  getMyProfile,
  getOtherProfile,
} from "../../JS/actions/profile";
import Modal from "@mui/material/Modal";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import SendIcon from "@mui/icons-material/Send";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { CircularProgress, TextareaAutosize } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import "./Profile.css";
import { addDemand } from "./../../JS/actions/demand";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Profile = ({ profile: profileProps }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [demand, setDemand] = useState({});
  const post = useSelector((state) => state.postReducer.post);
  const user = useSelector((state) => state.userReducer.user);
  const loadProfile = useSelector((state) => state.profileReducer.isLoad);
  const errorProfile = useSelector((state) => state.profileReducer.isError);
  const profileReducer = useSelector((state) => state.profileReducer.profile);
  const profile = profileProps || profileReducer;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const params = useParams();

  //send demand
  const handleDemandChange = (e) => {
    setDemand({ ...demand, [e.target.name]: e.target.value });
  };

  const handleDemandClick = () => {
    dispatch(addDemand(post._id, user._id, demand));
  };
  //delete profile
  const handleProfileDelete = () => {
    let del = window.confirm("Are you sure to delete this profile!");
    if (del) {
      dispatch(deleteProfile(profile._id));
    }
  };

  //get and edit profile
  useEffect(() => {
    if (params.id) {
      dispatch(getOtherProfile(params.id));
    } else if (!profileProps) {
      dispatch(getMyProfile());
    }
  }, []);

  const body = (
    <form style={modalStyle} className={classes.paper}>
      <TextareaAutosize
        class="form-control"
        name="content"
        placeholder="Write a message"
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
      <div className="profile">
        {loadProfile ? (
          <div className="loading">
            <CircularProgress color="primary" size={100} />
          </div>
        ) : errorProfile ? (
          <div className="error-data">
            <img
              src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/data_error.png"
              alt="error"
            />
          </div>
        ) : profile && profile ? (
          <div class="profile-outer-div">
            <div class="profile-inner-div">
              <div class="profile-front">
                <div class="profile-front__bkg-photo"></div>
                <div class="profile-front__face-photo">
                  <img
                    src={
                      profile.profilePic
                        ? `/uploads/${profile.profilePic}`
                        : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                    }
                    alt="..."
                    style={{
                      height: "120px",
                      width: "120px",
                      borderRadius: "50%",
                      margin: 0,
                    }}
                  />
                </div>
                <div class="profile-front__text">
                  <h3 class="profile-front__text-header">
                    {profile.owner.username || user.username || ""}
                    {profile.owner.role === "admin" ? (
                      <>
                        <VerifiedUserOutlinedIcon color="primary" />
                      </>
                    ) : null}
                    {user.role === "admin" && profile.owner._id !== user._id ? (
                      <>
                        <DeleteOutlineIcon
                          color="primary"
                          onClick={handleProfileDelete}
                        />
                      </>
                    ) : null}
                    {profile.owner._id === user._id ? (
                      <>
                        <Link to={`/profile/edit/${user._id}`}>
                          <EditOutlinedIcon color="primary" />
                        </Link>
                      </>
                    ) : null}
                  </h3>
                  <p class="profile-front__text-para">
                    {profile.address ? (
                      <RoomOutlinedIcon color="primary" />
                    ) : null}
                    {profile.address}
                  </p>
                  <p class="profile-front__text-para">
                    {profile.phone ? (
                      <LocalPhoneOutlinedIcon color="primary" />
                    ) : null}
                    {profile.phone}
                  </p>
                  {profile.owner._id === user._id ? null : (
                    <span
                      class="profile-front__text-hover"
                      onClick={handleOpen}
                    >
                      <ForumIcon /> Message
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        {body}
                      </Modal>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Redirect to="/createProfile" />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Profile;
