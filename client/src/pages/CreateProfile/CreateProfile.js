import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { CircularProgress } from "@mui/material";

import {
  createProfile,
  editMyProfile,
  getMyProfile,
} from "../../JS/actions/profile";
import "./CreateProfile.css";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const themema = createTheme({
  palette: {
    primary: {
      main: "#E90128",
    },
  },
});

const CreateProfile = () => {
  const [profile, setProfile] = useState({
    bio: "",
    phone: "",
    address: "",
    date_of_birth: "",
    profilePic: null,
  });
  const [userName, setuserName] = useState("");
  const [edit, setEdit] = useState(false);
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const user = useSelector((state) => state.userReducer.user);
  const editProfileState = useSelector((state) => state.profileReducer.profile);
  const loadProfile = useSelector((state) => state.profileReducer.isLoad);
  const errorProfile = useSelector((state) => state.profileReducer.isError);

  const handleChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleProfileClick = (e) => {
    e.preventDefault();
    if (profile.phone) {
      if (edit) {
        const formData = new FormData();
        formData.append("profilePic", fileName);
        formData.append("bio", profile.bio);
        formData.append("phone", profile.phone);
        formData.append("date_of_birth", profile.date_of_birth);
        formData.append("address", profile.address);
        formData.append("username", userName);
        dispatch(editMyProfile(params.id, formData, history));
        alert("Profile edited successfully");
      } else {
        dispatch(createProfile(profile, history));
        alert("Profile created successfully");
      }
    } else {
      alert("Check required fields");
    }
  };

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch, params.id]);

  useEffect(() => {
    if (params.id) {
      setEdit(true);
    } else {
      setEdit(false);
    }
    edit
      ? (function () {
          setProfile(editProfileState);
          setuserName(user.username);
        })()
      : setProfile({
          bio: "",
          phone: "",
          address: "",
          date_of_birth: "",
          profilePic: null,
        });
  }, [edit, editProfileState, params.id, user]);
  return (
    <ThemeProvider theme={themema}>
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
      ) : (
        <form className="create-profile">
          <h2>{edit ? "Edit your profile" : "Create your profile"}</h2>
          <label>Username</label>
          <input
            onChange={
              edit ? (e) => setuserName(e.target.value) : handleProfileChange
            }
            name="username"
            value={edit ? userName : user.username}
          />
          <label>Address</label>
          <input
            onChange={handleProfileChange}
            name="address"
            value={profile && profile.address}
            required
          />
          <label>Bio</label>
          <input
            onChange={handleProfileChange}
            name="bio"
            required
            value={profile && profile.bio}
          />
          <label>Phone*</label>
          <input
            type="tel"
            onChange={handleProfileChange}
            name="phone"
            required
            value={profile && profile.phone}
          />
          <label>Date of birth</label>
          <input
            type="date"
            onChange={handleProfileChange}
            name="date_of_birth"
            required
            value={profile && profile.date_of_birth}
          />
          {edit ? (
            <div className="profile-image">
              <label htmlFor="file">Upload an image</label>
              <Button color="inherit" size="large" component="label">
                <AddAPhotoIcon color="primary" />
                <input
                  type="file"
                  filename="profilePic"
                  className="form-control-file"
                  onChange={handleChangeFile}
                  hidden
                />
              </Button>
            </div>
          ) : null}
          <button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
            className="add-edit-button"
            onClick={handleProfileClick}
          >
            {edit ? (
              <EditAttributesIcon variant="outlined" />
            ) : (
              <SaveOutlinedIcon />
            )}
          </button>
        </form>
      )}
    </ThemeProvider>
  );
};

export default CreateProfile;
