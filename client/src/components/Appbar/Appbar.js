import React from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import Navbarstyled from "../Navbarstyled/Navbarstyled";
import Sidebar from "../Sidebar/Sidebar";

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} handleOpen={handleOpen} location={location} />
      <Navbarstyled handleOpen={handleOpen} location={location} />
    </>
  );
};

export default Appbar;
