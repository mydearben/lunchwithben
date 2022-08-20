import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import {
  MenuContainer,
  MenuHeading,
  MenuWrapper,
  MenuTitle,
  MenuCard,
  MenuImg,
  MenuInfo,
  MenuDesc,
  MenuPrice,
  MenuButton,
  CartContainer,
  CartButton,
  CartIcon,
} from "./MenuElements";
import { Modal } from "../Modal";

const Menu = ({ heading, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        isOrder={false}
      />
      <MenuContainer>
        <MenuHeading>
          <Navbar toggle={toggle} heading={heading} />
          <Sidebar isOpen={isOpen} toggle={toggle} />
        </MenuHeading>
        <MenuWrapper>
          {data.map((product, index) => {
            return (
              <MenuCard key={index}>
                <MenuImg src={product.img} alt={product} />
                <MenuInfo>
                  <MenuTitle>{product.name}</MenuTitle>
                  <MenuDesc>{product.desc}</MenuDesc>
                  <MenuPrice>{product.price}</MenuPrice>
                  <MenuButton onClick={openModal}>{product.button}</MenuButton>
                </MenuInfo>
              </MenuCard>
            );
          })}
        </MenuWrapper>
      </MenuContainer>
      <CartContainer>
        <CartButton>
          <CartIcon />
          <p>View Cart</p>
        </CartButton>
      </CartContainer>
    </>
  );
};

export default Menu;
