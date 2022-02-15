import React from "react";
import Icon1 from "../images/deliv-service.png";
import Icon2 from "../images/train.png";
import Icon3 from "../images/fee.jpg";
import {
  ServicesCard,
  ServicesContainer,
  ServicesH2,
  ServicesH3,
  ServicesIcon,
  ServicesP,
  ServicesWrapper,
} from "../common/ServicesElements";

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH2>Our services</ServicesH2>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH3>Delivery Service</ServicesH3>
          <ServicesP>
          We can arrange for your item to be delivered to your home / office by carrier.{" "}
          </ServicesP>
        </ServicesCard>

        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH3>Transportation Network</ServicesH3>
          <ServicesP>
          We provide Lost & Found services for  passenger terminals and transport providers.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH3>No fees</ServicesH3>
          <ServicesP>
            Once you create an account, you have acces to our platform with no charges.
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
