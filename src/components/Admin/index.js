import React, { useState, useEffect } from "react";
import {
  AdminHeading,
  PageDiv,
  CoverDiv,
  InputDiv,
  CoverContainer,
  CoverHeader,
  RestaurantList,
  ConfirmButton,
  StopButton,
} from "./AdminElements";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import firebase from "../../firebase";

const PassphraseForm = ({ heading }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [passphrase, setPassphrase] = useState("");

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handlePassphraseChange = (text) => {
    setPassphrase(text);
  };

  const handleRestaurantChange = (restaurant) => {
    setSelectedRestaurant(restaurant);

    if (restaurant.name !== "") {
      setShouldDisable(false);
    }
  };

  const disallowOrders = () => {
    firebase
      .firestore()
      .collection("restaurants")
      .where("lunchToday", "==", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          firebase
            .firestore()
            .collection("restaurants")
            .doc(doc.id)
            .update({ lunchToday: false });
        });
      });
  };

  const updateTodaysRestaurant = () => {
    var previousRestaurantId = "";

    firebase
      .firestore()
      .collection("restaurants")
      .where("lunchToday", "==", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          previousRestaurantId = doc.id;
        });
      })
      .then(() => {
        if (previousRestaurantId === "") {
          firebase
            .firestore()
            .collection("restaurants")
            .doc(selectedRestaurant.id)
            .update({ lunchToday: true });
        } else if (previousRestaurantId !== selectedRestaurant.id) {
          firebase
            .firestore()
            .collection("restaurants")
            .doc(previousRestaurantId)
            .update({ lunchToday: false })
            .then(
              firebase
                .firestore()
                .collection("restaurants")
                .doc(selectedRestaurant.id)
                .update({ lunchToday: true })
            );
        }
      });
  };

  useEffect(() => {
    // Load the "restaurants" collection from the database
    const tempRestaurants = [];

    firebase
      .firestore()
      .collection("restaurants")
      .orderBy("name")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let tempId = { id: doc.id };

          tempRestaurants.push({ ...tempId, ...doc.data() });
        });

        setRestaurants(tempRestaurants);
      });
  }, []);

  useEffect(() => {
    if (passphrase === process.env.REACT_APP_ADMIN_PASSPHRASE) {
      setIsAuthenticated(true);
    }
  }, [passphrase]);

  if (isAuthenticated) {
    return (
      <PageDiv>
        <AdminHeading>
          <Navbar toggle={toggle} heading={heading} />
          <Sidebar isOpen={isOpen} toggle={toggle} />
        </AdminHeading>
        <CoverContainer>
          <CoverDiv>
            <CoverHeader>Select Restaurant</CoverHeader>
            <RestaurantList
              options={restaurants}
              getOptionLabel={(restaurant) => restaurant.name}
              getOptionValue={(restaurant) => restaurant.name}
              onChange={handleRestaurantChange}
              maxMenuHeight={250}
              placeholder={
                selectedRestaurant.name === ""
                  ? "Select..."
                  : selectedRestaurant.name
              }
            />
            <ConfirmButton
              disabled={shouldDisable}
              onClick={updateTodaysRestaurant}
            >
              Confirm
            </ConfirmButton>
            <StopButton onClick={disallowOrders}>Stop Orders</StopButton>
          </CoverDiv>
        </CoverContainer>
      </PageDiv>
    );
  } else {
    return (
      <PageDiv>
        <AdminHeading>
          <Navbar toggle={toggle} heading={heading} />
          <Sidebar isOpen={isOpen} toggle={toggle} />
        </AdminHeading>
        <CoverContainer>
          <CoverDiv>
            <CoverHeader>Passphrase</CoverHeader>
            <InputDiv
              type="password"
              placeholder="Enter Passphrase..."
              onChange={(e) => handlePassphraseChange(e.target.value)}
            />
          </CoverDiv>
        </CoverContainer>
      </PageDiv>
    );
  }
};

export default PassphraseForm;
