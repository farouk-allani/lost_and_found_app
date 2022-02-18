import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { createpost } from "../../JS/actions/post";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router";
import "./AddPost.css";

const themema = createTheme({
  palette: {
    primary: {
      main: "#E90128",
    },
  },
});

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(Date.now());
  const [location, setLocation] = useState("");
  const [isLost, setIsLost] = useState(true);
  const [fileName, setFileName] = useState("");
  const history = useHistory();

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
      dispatch(createpost(formData, history));
      setTitle("");
      setContent("");
      setCategory("");
      setLocation("");
      setDate(Date.now());
      setIsLost(true);
      alert("Post created successfully");
    } else {
      alert("Check required fields");
    }
  };

  return (
    <ThemeProvider theme={themema}>
      <form className="add-post">
        <h2>Add a post</h2>
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
          default={Date.now()}
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
              Select category...
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
          <Button color="primary" size="large" component="label">
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
          style={{backgroundColor:"#E90128"}}
          type="submit"
          variant="contained"
          size="small"
          onClick={handleClick}
        >
          <SaveOutlinedIcon variant="outlined" />
        </button>
      </form>
    </ThemeProvider>
  );
};

export default AddPost;
