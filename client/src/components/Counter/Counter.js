import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {}, [count]);
  const handleClickPlus = () => {
    setCount(count + 1);
  };

  const handleClickMinus = () => {
    count > 0 && setCount(count - 1);
  };

  return (
    <div className="counterPart">
      <div className="counterContent">
        <Button
          variant="success"
          className="addMinusBtn"
          onClick={handleClickPlus}
        >
          +
        </Button>
        <h2>{count}</h2>
        <Button
          variant="success"
          className="addMinusBtn"
          onClick={handleClickMinus}
        >
          -
        </Button>
      </div>
    </div>
  );
};

export default Counter;
