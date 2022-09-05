import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
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
  ScrollToBottomContainer,
  ScrollToBottomIcon,
} from "./MenuElements";
import { Modal } from "../Modal";
import firebase from "../../firebase";

const Menu = ({ heading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]);
  const [menuDetails, setMenuDetails] = useState({});

  // Retrieve the data that was passed via the Link component from the Home Page
  // For this, we would need to use the useLocation() hook
  const location = useLocation();
  const restaurantId = location.state;

  const cartRef = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const openModal = (modalNumber, selectedMenu) => {
    setShowModal((prev) => !prev);
    setModalType(modalNumber);

    if (modalNumber === 0) {
      setMenuDetails(selectedMenu);
    }
  };

  useEffect(() => {
    // Load the "menu" collection from the database, depending on the selected restaurant
    const tempMenu = [];

    firebase
      .firestore()
      .collection("restaurants")
      .doc(restaurantId)
      .collection("menu")
      .orderBy("foodName")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let tempId = { id: doc.id };

          tempMenu.push({ ...tempId, ...doc.data() });
        });

        setMenu(tempMenu);
      });
  }, []);

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
        cart={cart}
        setCart={setCart}
        menuDetails={menuDetails}
      />
      <ScrollToBottomContainer
        ref={cartRef}
        onClick={() => scrollToSection(cartRef)}
      >
        <ScrollToBottomIcon />
      </ScrollToBottomContainer>
      <MenuContainer>
        <MenuHeading>
          <Navbar toggle={toggle} heading={heading} />
          <Sidebar isOpen={isOpen} toggle={toggle} />
        </MenuHeading>
        <MenuWrapper>
          {menu &&
            menu.map((product, index) => {
              return (
                <MenuCard key={index}>
                  <MenuImg
                    src={require("../../images/restaurants/" +
                      product.foodName.replace(/\s+/g, "").toLowerCase() +
                      ".png")}
                    alt={product.foodName}
                  />
                  <MenuInfo>
                    <MenuTitle>{product.foodName}</MenuTitle>
                    <MenuDesc>{product.description}</MenuDesc>
                    <MenuPrice>
                      RM{" "}
                      {Number(
                        Math.round(parseFloat(product.price + "e" + 2)) +
                          "e-" +
                          2
                      ).toFixed(2)}
                    </MenuPrice>
                    <MenuButton onClick={() => openModal(0, product)}>
                      Place Order
                    </MenuButton>
                  </MenuInfo>
                </MenuCard>
              );
            })}
        </MenuWrapper>
      </MenuContainer>
      <CartContainer ref={cartRef}>
        <CartButton disabled={cart.length <= 0} onClick={() => openModal(2)}>
          <CartIcon />
          <p>View Cart</p>
        </CartButton>
      </CartContainer>
    </>
  );
};

export default Menu;
