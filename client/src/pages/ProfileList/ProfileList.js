import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Profile from "./../Profile/Profile";
import { getAllProfiles } from "./../../JS/actions/profile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#E90128",
    },
  },
});

const ProfileList = () => {
  const loadProfile = useSelector((state) => state.profileReducer.isLoad);
  const errorProfile = useSelector((state) => state.profileReducer.isError);
  const profiles = useSelector((state) => state.profileReducer.profiles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
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
      ) : !profiles.length ? (
        <h2 className="error-contact">There is no profile!</h2>
      ) : (
        <div className="profiles">
          {profiles &&
            profiles.map((el) => <Profile profile={el} key={el._id} />)}
        </div>
      )}
    </ThemeProvider>
  );
};

export default ProfileList;
