import React, { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Modal from "@material-ui/core/Modal";
import SendIcon from "@mui/icons-material/Send";
import { TextareaAutosize } from "@material-ui/core";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import "./Demand.css";
import { updateDemand } from "../../JS/actions/demand";
import { deleteDemand } from "./../../JS/actions/demand";

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

const Demand = ({ demand }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [demandstate, setDemandstate] = useState(demand);
  const user = useSelector((state) => state.userReducer.user);
  const post = useSelector((state) => state.postReducer.post);
  const loadDemand = useSelector((state) => state.demandReducer.isLoad);
  const errorDemand = useSelector((state) => state.demandReducer.isError);
  const params = useParams();
  const dispatch = useDispatch();

  //Delete comment on click on the icon
  const handleDemandDelete = () => {
    let del = window.confirm("Are you sure to delete this comment!");
    if (del) {
      dispatch(deleteDemand(demand._id, params.id));
    }
  };

  //Edit comment on click on the icon
  const handleDemandEdit = () => {
    dispatch(updateDemand(demand._id, user._id, demandstate));
  };

  ////open the model that contains the commment content
  const handleOpen = () => {
    setOpen(true);
  };
  //close the model that contains the commment content
  const handleClose = () => {
    setOpen(false);
  };
  const handleDemandChange = (e) => {
    setDemandstate({ ...demandstate, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setDemandstate(demandstate);
  }, [demandstate, demand._id]);

  const lastState = () => {
    setDemandstate(demandstate);
  };

  const body = (
    <form style={modalStyle} className={classes.paper}>
      <TextareaAutosize
        class="form-control"
        name="content"
        value={demandstate.content}
        onChange={handleDemandChange}
      />
      <Button
        onClick={() => {
          handleDemandEdit();
          handleClose();
        }}
      >
        <SendIcon color="primary" />
      </Button>
    </form>
  );

  return (
    <div className="demand-container">
      {loadDemand ? (
        <div className="loading">
          <CircularProgress color="primary" size={200} />
        </div>
      ) : errorDemand ? (
        <div className="error-data">
          <img
            src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/data_error.png"
            alt="error"
          />
        </div>
      ) : demand.from === user._id && demand.about === post._id ? (
        <div className="demand">
          <div className="demand-edit-delete">
            <DeleteForeverOutlinedIcon
              color="primary"
              onClick={handleDemandDelete}
            />
            <small className="time">
              {demand.createdAt.split("T")[0].replace("-", "/")}
              <AccessTimeIcon color="primary" size="small" />
              {demand.createdAt.slice(11, 16)}
            </small>
            <EditOutlinedIcon
              color="primary"
              onClick={() => {
                lastState();
                handleOpen();
              }}
            />{" "}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </div>
          <div className="demand-details">
            <p>{demand.content}</p>
          </div>
        </div>
      ) : (
        <small>Private demand (of other user)</small>
      )}
    </div>
  );
};

export default Demand;
