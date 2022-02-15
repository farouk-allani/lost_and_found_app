import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { current } from "../../JS/actions/user";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import { AiOutlinePieChart } from "react-icons/ai";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileList from "./../ProfileList/ProfileList";
import Chart from "./../../components/Chart/Chart";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E90128",
    },
  },
});

const Admin = () => {
  const [showprofile, setShowprofile] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleShowprofile = () => {
    setShowprofile(!showprofile);
  };
  useEffect(() => {
    if (token) {
      dispatch(current());
    }
  }, [dispatch, token]);
  return (
    <ThemeProvider theme={theme}>
      <div className="admin">
        <ButtonGroup
          variant="outlined"
          size="large"
          aria-label="outlined primary button group"
        >
          <Button>
            <SupervisedUserCircleOutlinedIcon
              color="primary"
              onClick={handleShowprofile}
            />
          </Button>
          <Button>
            <AiOutlinePieChart
              color="primary"
              size={20}
              onClick={handleShowprofile}
            />
          </Button>
        </ButtonGroup>
      </div>
      {!showprofile ? <ProfileList /> : <Chart />}
    </ThemeProvider>
  );
};

export default Admin;
