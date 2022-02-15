import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router";
import Demand from "../../components/Demand/Demand";
import { getAllDemands } from "../../JS/actions/demand";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaCommentSlash } from "react-icons/fa";
import "./DemandList.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E90128",
    },
  },
});

const DemandList = () => {
  const demands = useSelector((state) => state.demandReducer.demands);
  const loadDemand = useSelector((state) => state.demandReducer.isLoad);
  const errorDemand = useSelector((state) => state.demandReducer.isError);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getAllDemands(params.id));
  }, [dispatch, params.id]);
  return (
    <ThemeProvider theme={theme}>
      {loadDemand ? (
        <div className="loading">
          <CircularProgress color="primary" size={100} />
        </div>
      ) : errorDemand ? (
        <div className="error-data">
          <img
            src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/data_error.png"
            alt="error"
          />
        </div>
      ) : !demands.length ? (
        <div className="error-list">
          <FaCommentSlash size={200} />
        </div>
      ) : (
        <div className="demands">
          {demands && demands.map((el) => <Demand demand={el} key={el._id} />)}
        </div>
      )}
    </ThemeProvider>
  );
};

export default DemandList;
