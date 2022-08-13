import React, { useRef, useEffect, useCallback, useState } from "react";
import {
  Background,
  ModalWrapper,
  ModalHeader,
  ModalContent,
  ModalDetails,
  ModalImg,
  ModalTotal,
  CloseModalButton,
  CancelButton,
  PlusButton,
  MinusButton,
} from "./ModalElements";

export const Modal = ({ showModal, setShowModal, isOrder }) => {
  const [amount, setAmount] = useState(0);

  const addAmount = () => {
    setAmount(amount + 1);
  };

  const minusAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  if (isOrder) {
    return (
      <>
        {showModal ? (
          <Background onClick={closeModal} ref={modalRef}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <ModalImg
                  src={require("../../images/sampleAvatar.png")}
                  alt="camera"
                />
                <ModalHeader>Order</ModalHeader>
                <ModalDetails>
                  <p>Chicken Rice x1</p>
                  <p>RM 6.50</p>
                </ModalDetails>
                <ModalTotal>Total: RM 6.50</ModalTotal>
                <CancelButton>Cancel Order</CancelButton>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
          </Background>
        ) : null}
      </>
    );
  } else {
    return (
      <>
        {showModal ? (
          <Background onClick={closeModal} ref={modalRef}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <ModalImg
                  src={require("../../images/sampleAvatar.png")}
                  alt="camera"
                />
                <ModalHeader>Order</ModalHeader>
                <ModalDetails>
                  <p>Chicken Rice</p>
                  <p>RM 6.50</p>
                </ModalDetails>
                <ModalDetails>
                  <p>Amount:</p>
                  <MinusButton onClick={minusAmount}>-</MinusButton>
                  <p>{amount}</p>
                  <PlusButton onClick={addAmount}>+</PlusButton>
                </ModalDetails>
                <ModalTotal>Total: RM 6.50</ModalTotal>
                <CancelButton>Place Order</CancelButton>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
          </Background>
        ) : null}
      </>
    );
  }
};
