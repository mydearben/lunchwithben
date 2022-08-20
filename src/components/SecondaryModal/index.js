import React, { useRef, useEffect, useCallback, useState } from "react";
import {
  Background,
  ModalWrapper,
  ModalHeader,
  ModalContent,
  ModalDetails,
  YesButton,
  NoButton,
} from "./SecondaryModalElements";

export const SecondaryModal = ({
  showSecondaryModal,
  setShowSecondaryModal,
  closeParentModal,
}) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowSecondaryModal(false);
    }
  };

  const closeParentAndCurrentModal = (e) => {
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

  return (
    <>
      {showSecondaryModal ? (
        <Background>
          <ModalWrapper showSecondaryModal={showSecondaryModal}>
            <ModalContent>
              <ModalHeader>Cancel Benjamin's Order ?</ModalHeader>
              <ModalDetails>
                <YesButton onClick={closeParentAndCurrentModal}>Yes</YesButton>
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
};
