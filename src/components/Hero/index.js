import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import {
  HeroBtn,
  HeroContainer,
  HeroContent,
  HeroH1,
  HeroItems,
  HeroP,
} from "./HeroElements";
import firebase from "../../firebase";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [restaurant, setRestaurant] = useState([]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Load the "restaurants" collection from the database
    // We should get only 1 restaurant, as we're ordering lunch from the same place each day
    const tempRestaurants = [];

    firebase
      .firestore()
      .collection("restaurants")
      .where("lunchToday", "==", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let tempId = { id: doc.id };

          tempRestaurants.push({ ...tempId, ...doc.data() });
        });

        setRestaurant(tempRestaurants);
      });
  }, []);

  if (!restaurant[0]) {
    return null;
  } else {
    return (
      <HeroContainer>
        <Navbar toggle={toggle} heading="Lunch With Ben" />
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <HeroContent>
          <HeroItems>
            <HeroH1>{restaurant[0].name}</HeroH1>
            <HeroP>is for lunch today !</HeroP>
            <HeroBtn to="/menu" state={restaurant[0].id}>
              Place Order
            </HeroBtn>
          </HeroItems>
        </HeroContent>
      </HeroContainer>
    );
  }
};

export default Hero;
