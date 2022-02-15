import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import { editPost, getpost } from "../../JS/actions/post";
import { useParams } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router";

const themema = createTheme({
  palette: {
    primary: {
      main: "#E90128",
    },
  },
});

const EditPost = () => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [isLost, setIsLost] = useState(true);
  const [fileName, setFileName] = useState("");
  const history = useHistory();

  const editPostState = useSelector((state) => state.postReducer.post);
  const handleChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    if (title && content && date && location && isLost) {
      const formData = new FormData();
      formData.append("postImage", fileName);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("location", location);
      formData.append("date", date);
      formData.append("isLost", isLost);
      dispatch(editPost(params.id, formData, history));
      setTitle("");
      setContent("");
      setCategory("");
      setLocation("");
      setDate("");
      setIsLost(true);
      setFileName("");
      alert("Post created successfully");
    }
  };

  useEffect(() => {
    setTitle(editPostState && editPostState.title);
    setContent(editPostState && editPostState.content);
    setCategory(editPostState && editPostState.category);
    setLocation(editPostState && editPostState.location);
    setDate(editPostState && editPostState.date);
    setIsLost(editPostState && editPostState.isLost);
    setFileName(editPostState && editPostState.postImage);
  }, [editPostState, params.id]);

  useEffect(() => {
    dispatch(getpost(params.id));
  }, [dispatch, params.id]);

  return (
    <ThemeProvider theme={themema}>
      <form className="add-post">
        <h2>Edit your post</h2>
        <label>Title*</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <label>Content*</label>
        <input
          type="text"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />
        <label>Location*</label>
        <input
          type="text"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          value={location}
        />
        <label>Date*</label>
        <input
          type="datetime-local"
          id="start"
          name="trip-start"
          onChange={(e) => {
            setDate(e.target.value);
          }}
          value={date}
        />
        <div className="select">
          <label>Category</label>
          <select
            name="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
          >
            <option value="" style={{ color: "#ccc" }}>
              select category
            </option>
            <option value="Human">Human</option>
            <option value="Pets/Animals">Pets/Animals</option>
            <option value="Mechanics">Mechanics</option>
            <option value="Electronis">Electronis</option>
            <option value="Accessories">Accessories</option>
            <option value="Clothing">Clothing</option>
            <option value="Papers">Papers</option>
          </select>
          <label>IsLost*</label>
          <select
            name="isLost"
            onChange={(e) => {
              setIsLost(e.target.value);
            }}
            value={isLost}
          >
            <option value={true}>Lost</option>
            <option value={false}>Found</option>
          </select>
        </div>
        <div className="post-image">
          <label htmlFor="file">Upload an image</label>
          <Button color="inherit" size="large" component="label">
            <AddAPhotoIcon color="primary" />
            <input
              type="file"
              filename="postImage"
              className="form-control-file"
              onChange={handleChangeFile}
              hidden
            />
          </Button>
        </div>
        <button
          type="submit"
          variant="contained"
          size="small"
          onClick={handleClick}
        >
          <EditAttributesIcon variant="outlined" />
        </button>
      </form>
    </ThemeProvider>
  );
};

export default EditPost;
