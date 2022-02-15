import React from "react";

import {
  ArrowForward,
  ArrowRight,
  HeroBg,
  HeroBtnWrapper,
  HeroContainer,
  HeroContent,
  HeroH1,
  HeroP,
  ImgBg,
} from "../../common/HeroSectionElements";
import { useState } from "react";
import { Button } from "../../common/ButtonElements";
import backimg from '../../images/background.jpg';

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <HeroContainer>
      <HeroBg>
        <ImgBg src={backimg} />
      </HeroBg>
      <HeroContent>
        <HeroH1>We reunite people with Lost & Found property</HeroH1>
        <HeroP>
          Register your valuables with Lost & Found in Tunisia.
           So you can start searching from the moment you lose something.
        </HeroP>
        <HeroBtnWrapper>
          <Button
            to="about"
            
            onMouseEnter={onHover}
            onMouseLeave={onHover}
          >
            GET STARTED{hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
