import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Filter = ({ setFilter, filter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="All"
        name="all"
        value={filter}
        onChange={handleChange}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <FormControlLabel
          onClick={() => {
            setFilter("All");
          }}
          value="All"
          control={<Radio />}
          label="All"
        />
        <FormControlLabel
          onClick={() => {
            setFilter("Lost");
          }}
          value="Lost"
          control={<Radio />}
          label="Lost Items"
        />
        <FormControlLabel
          onClick={() => {
            setFilter("Found");
          }}
          value="Found"
          control={<Radio />}
          label="Found Items"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default Filter;
