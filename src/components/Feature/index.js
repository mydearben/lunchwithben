import React from "react";
import { FeatureContainer, FeatureButton } from "./FeatureElements";

const Feature = () => {
  return (
    <FeatureContainer>
      <h1>Pizza of the day</h1>
      <p1>Truffle alfredo sauce topped with 24 carat gold dust.</p1>
      <FeatureButton>Order Now</FeatureButton>
    </FeatureContainer>
  );
};

export default Feature;
