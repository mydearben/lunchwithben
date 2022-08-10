import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
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
} from "./ModalElements";

export const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

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
};
