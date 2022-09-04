import React, { useRef, useEffect, useCallback } from "react";
import {
  Background,
  ModalWrapper,
  ModalHeader,
  ModalContent,
  ModalDetails,
  YesButton,
  NoButton,
} from "./SecondaryModalElements";
import firebase from "../../firebase";
import moment from "moment";

export const SecondaryModal = ({
  showSecondaryModal,
  setShowSecondaryModal,
  closeParentModal,
  secondaryModalType,
  resetCart,
  orderToBePlaced,
  idOfOrderToBeDeleted,
  nameOfOrder,
  toggleRefresh,
  setToggleRefresh,
}) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowSecondaryModal(false);
    }
  };

  const cancelOrder = (id) => {
    firebase
      .firestore()
      .collection("orders")
      .doc(id)
      .delete()
      .then(() => {
        setShowSecondaryModal(false);
        closeParentModal(false);
      })
      .then(setToggleRefresh(!toggleRefresh));
  };

  const confirmOrder = (e) => {
    // Firstly, check and see if the user already ordered something today
    firebase
      .firestore()
      .collection("orders")
      .where("name", "==", orderToBePlaced[0].name)
      // .where("date", "==", someDate)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // If the user already ordered something today, update their order
          const tempOrders = [];
          let idOfCurrentDocument;

          querySnapshot.forEach((doc) => {
            idOfCurrentDocument = doc.id;
            tempOrders.push(doc.data());
          });

          const originalTempOrdersLength = tempOrders[0].order.length;

          for (
            let tempOrderIndex = 0;
            tempOrderIndex < originalTempOrdersLength;
            tempOrderIndex++
          ) {
            for (
              let orderToBePlacedIndex = 0;
              orderToBePlacedIndex < orderToBePlaced.length;
              orderToBePlacedIndex++
            ) {
              if (
                tempOrders[0].order[tempOrderIndex].id ===
                orderToBePlaced[orderToBePlacedIndex].id
              ) {
                tempOrders[0].order[tempOrderIndex].amount +=
                  orderToBePlaced[orderToBePlacedIndex].amount;
              } else {
                tempOrders[0].order.push({
                  id: orderToBePlaced[orderToBePlacedIndex].id,
                  foodName: orderToBePlaced[orderToBePlacedIndex].foodName,
                  price: orderToBePlaced[orderToBePlacedIndex].price,
                  amount: orderToBePlaced[orderToBePlacedIndex].amount,
                });
              }
            }
          }

          // Update the data into the database
          firebase
            .firestore()
            .collection("orders")
            .doc(idOfCurrentDocument)
            .update(tempOrders[0]);
        } else {
          // Otherwise, just add a completely new order
          firebase
            .firestore()
            .collection("orders")
            .add({
              // Restructure the "cart" data to the way we want it, and store this format into the database
              // (Note: I don't think we need the Order ID here ?)
              name: orderToBePlaced[0].name,
              date: moment().format("LL"),
              order: orderToBePlaced.map((product, index) => {
                return {
                  id: product.id,
                  foodName: product.foodName,
                  price: product.price,
                  amount: product.amount,
                };
              }),
            });
        }
      })
      .then(
        // Need to be called only after inserting the data into the database, otherwise the "cart" might be empty
        resetCart([])
      );

    setShowSecondaryModal(false);
    closeParentModal(false);
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showSecondaryModal) {
        setShowSecondaryModal(false);
      }
    },
    [setShowSecondaryModal, showSecondaryModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // 1: Cancel Order (From List of Everyone's Orders)
  // 2: Order Received Confirmation (From View Cart)
  switch (secondaryModalType) {
    // 1: Cancel Order (From List of Everyone's Orders)
    case 1:
      return (
        <>
          {showSecondaryModal ? (
            <Background>
              <ModalWrapper showSecondaryModal={showSecondaryModal}>
                <ModalContent>
                  <ModalHeader>Cancel {nameOfOrder}'s Order ?</ModalHeader>
                  <ModalDetails>
                    <YesButton
                      onClick={() => cancelOrder(idOfOrderToBeDeleted)}
                    >
                      Yes
                    </YesButton>
                    <NoButton onClick={closeModal} ref={modalRef}>
                      No
                    </NoButton>
                  </ModalDetails>
                </ModalContent>
              </ModalWrapper>
            </Background>
          ) : null}
        </>
      );

    // 2: Order Received Confirmation (From View Cart)
    case 2:
      return (
        <>
          {showSecondaryModal ? (
            <Background>
              <ModalWrapper showSecondaryModal={showSecondaryModal}>
                <ModalContent>
                  <ModalHeader>Order Received !</ModalHeader>
                  <ModalDetails>
                    <YesButton onClick={confirmOrder}>OK</YesButton>
                  </ModalDetails>
                </ModalContent>
              </ModalWrapper>
            </Background>
          ) : null}
        </>
      );

    default:
      break;
  }
};
