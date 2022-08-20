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
  NameList,
} from "./ModalElements";
import { SecondaryModal } from "../SecondaryModal";

const options = [
  { value: "ooi", label: "Ooi" },
  { value: "keywei", label: "Key Wei" },
  { value: "glenn", label: "Glenn" },
  { value: "selvyn", label: "Selvyn" },
  { value: "benny", label: "Benny" },
  { value: "benjamin", label: "Benjamin" },
];

export const Modal = ({ showModal, setShowModal, isOrder }) => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [showSecondaryModal, setShowSecondaryModal] = useState(false);

  const openSecondaryModal = () => {
    setShowSecondaryModal((prev) => !prev);
  };

  const addAmount = () => {
    setAmount(amount + 1);
  };

  const minusAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  const handleNameChange = (selectedName) => {
    console.log("handleNameChange", selectedName);
    setName(selectedName.value);
    console.log("name", name);
  };

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setName("");
      setAmount(0);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        setName("");
        setAmount(0);
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
        <SecondaryModal
          showSecondaryModal={showSecondaryModal}
          setShowSecondaryModal={setShowSecondaryModal}
          closeParentModal={setShowModal}
        />
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
                <CancelButton onClick={openSecondaryModal}>
                  Cancel Order
                </CancelButton>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => {
                  setShowModal((prev) => !prev);
                  setName("");
                  setAmount(0);
                }}
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
                  <p>Name:</p>
                  <NameList
                    options={options}
                    onChange={handleNameChange}
                    maxMenuHeight={250}
                  />
                </ModalDetails>
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
                <ModalTotal>
                  Total: RM{" "}
                  {Number(
                    Math.round(parseFloat(amount * 6.5 + "e" + 2)) + "e-" + 2
                  ).toFixed(2)}
                </ModalTotal>
                <CancelButton disabled={name === "" || parseInt(amount) <= 0}>
                  Place Order
                </CancelButton>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => {
                  setShowModal((prev) => !prev);
                  setName("");
                  setAmount(0);
                }}
              />
            </ModalWrapper>
          </Background>
        ) : null}
      </>
    );
  }
};
