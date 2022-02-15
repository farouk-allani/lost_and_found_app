import React from "react";
import {
  homeObjOne,
  homeObjThree,
  homeObjTwo,
} from "./../../components/InfoSection/Data";
import HeroSection from "./../../components/HeroSection/HeroSection";
import InfoSection from "./../../components/InfoSection/InfoSection";
import Services from "./../../Services/Services";

const Home = () => {
  return (
    <>
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <Services />
      <InfoSection {...homeObjThree} />
    </>
  );
};

export default Home;
