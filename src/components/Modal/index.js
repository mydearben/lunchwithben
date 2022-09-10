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
  DeleteButton,
  NameList,
  TypeList,
} from "./ModalElements";
import { SecondaryModal } from "../SecondaryModal";
import firebase from "../../firebase";

export const Modal = ({
  showModal,
  setShowModal,
  modalType,
  cart,
  setCart,
  menuDetails,
  orderDetails,
  toggleRefresh,
  setToggleRefresh,
  restaurantId,
}) => {
  const [users, setUsers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [type, setType] = useState(
    restaurantId === "tfuBsEgrmzZqtayHrQoF" ? "" : "NA"
  );
  const [showSecondaryModal, setShowSecondaryModal] = useState(false);

  const modalRef = useRef();

  const openSecondaryModal = () => {
    setShowSecondaryModal((prev) => !prev);
  };

  const addToCart = () => {
    setShowModal(false);
    setAmount(0);

    const index = cart.findIndex((x) => x.id === menuDetails.id);

    if (index === -1) {
      console.log(type);
      // Food ordered doesn't exist in the array, we can add the new order directly into the "cart" state
      setCart([
        ...cart,
        {
          id: menuDetails.id,
          name: name,
          foodName:
            restaurantId === "tfuBsEgrmzZqtayHrQoF"
              ? menuDetails.foodName + " (" + type.value + ")"
              : menuDetails.foodName,
          price: menuDetails.price,
          amount: amount,
        },
      ]);
    } else {
      // Food ordered exists in the array, we need to update "cart" state accordingly
      const clonedCart = [...cart];

      clonedCart[index] = {
        id: menuDetails.id,
        name: name,
        foodName:
          restaurantId === "tfuBsEgrmzZqtayHrQoF"
            ? menuDetails.foodName + " (" + type.value + ")"
            : menuDetails.foodName,
        price: menuDetails.price,
        amount: parseFloat(clonedCart[index].amount) + amount,
      };

      setCart([...clonedCart]);
    }

    // Method 1: Add only
    // setCart([
    //   ...cart,
    //   {
    //     id: menuDetails.id,
    //     name: name,
    //     foodName: menuDetails.foodName,
    //     price: menuDetails.price,
    //     amount: amount,
    //   },
    // ]);

    // Method 2: Add or Replace
    // setCart([
    //   ...cart.filter((obj) => obj.id !== menuDetails.id),
    //   {
    //     id: menuDetails.id,
    //     name: name,
    //     foodName: menuDetails.foodName,
    //     price: menuDetails.price,
    //     amount: amount,
    //   },
    // ]);
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
    setName(selectedName.name);
  };

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
  };

  const calculateTotalPriceOfCart = () => {
    var totalPrice = 0;

    cart.forEach((element) => {
      totalPrice += element.price * element.amount;
    });

    return totalPrice;
  };

  const calculatePriceOfSingleItem = (price, amount) => {
    return Number(
      Math.round(parseFloat(amount * price + "e" + 2)) + "e-" + 2
    ).toFixed(2);
  };

  const calculateTotalPriceOfOrder = (order) => {
    let amount = 0;

    order.forEach((element) => {
      amount += Number(
        Math.round(parseFloat(element.amount * element.price + "e" + 2)) +
          "e-" +
          2
      );
    });

    return "RM " + amount.toFixed(2);
  };

  const removeOrderFromCart = (idToBeRemoved) => {
    setCart((current) =>
      current.filter((food) => {
        return food.id !== idToBeRemoved;
      })
    );
  };

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setAmount(0);
      setType("");

      if (modalType !== 1 && cart.length <= 0) {
        setName("");
      }
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        setAmount(0);
        setType("");

        if (cart.length <= 0) {
          setName("");
        }
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    // Load the "users" collection from the database
    const tempUsers = [];

    firebase
      .firestore()
      .collection("users")
      .orderBy("name")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let tempId = { id: doc.id };

          tempUsers.push({ ...tempId, ...doc.data() });
        });

        setUsers(tempUsers);
      });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // 0: Place an Order from the Menu
  // 1: List of Everyone's Orders
  // 2: View Cart
  switch (modalType) {
    // 0: Place an Order from the Menu
    case 0:
      return (
        <>
          {showModal ? (
            <Background onClick={closeModal} ref={modalRef}>
              <ModalWrapper showModal={showModal}>
                <ModalContent>
                  <ModalImg
                    src={require("../../images/restaurants/" +
                      menuDetails.foodName.replace(/\s+/g, "").toLowerCase() +
                      ".png")}
                    alt="camera"
                  />
                  <ModalHeader>Order</ModalHeader>
                  <ModalDetails>
                    <p>Name:</p>
                    <NameList
                      options={users}
                      getOptionLabel={(user) => user.name}
                      getOptionValue={(user) => user.name}
                      onChange={handleNameChange}
                      maxMenuHeight={250}
                      isDisabled={cart.length > 0}
                      placeholder={name === "" ? "Select..." : name}
                    />
                  </ModalDetails>
                  <ModalDetails>
                    <p>Food: {menuDetails.foodName}</p>
                  </ModalDetails>
                  {restaurantId === "tfuBsEgrmzZqtayHrQoF" ? (
                    <ModalDetails>
                      <p>Type:</p>
                      <TypeList
                        options={menuDetails.type.map((menuType) => {
                          return {
                            value: menuType,
                            label: menuType,
                          };
                        })}
                        onChange={handleTypeChange}
                        maxMenuHeight={250}
                        placeholder={type === "" ? "Select..." : type}
                      />
                    </ModalDetails>
                  ) : null}
                  <ModalDetails>
                    <p>
                      Price: RM{" "}
                      {Number(
                        Math.round(parseFloat(menuDetails.price + "e" + 2)) +
                          "e-" +
                          2
                      ).toFixed(2)}
                    </p>
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
                      Math.round(
                        parseFloat(amount * menuDetails.price + "e" + 2)
                      ) +
                        "e-" +
                        2
                    ).toFixed(2)}
                  </ModalTotal>
                  <CancelButton
                    disabled={
                      name === "" || parseInt(amount) <= 0 || type === ""
                    }
                    onClick={addToCart}
                  >
                    Place Order
                  </CancelButton>
                </ModalContent>
                <CloseModalButton
                  aria-label="Close modal"
                  onClick={() => {
                    setShowModal((prev) => !prev);
                    setAmount(0);
                    setType("");

                    if (cart.length <= 0) {
                      setName("");
                    }
                  }}
                />
              </ModalWrapper>
            </Background>
          ) : null}
        </>
      );

    // 1: List of Everyone's Orders
    case 1:
      return (
        <>
          <SecondaryModal
            showSecondaryModal={showSecondaryModal}
            setShowSecondaryModal={setShowSecondaryModal}
            closeParentModal={setShowModal}
            secondaryModalType={modalType}
            idOfOrderToBeDeleted={orderDetails.id}
            nameOfOrder={orderDetails.name}
            toggleRefresh={toggleRefresh}
            setToggleRefresh={setToggleRefresh}
          />
          {showModal ? (
            <Background onClick={closeModal} ref={modalRef}>
              <ModalWrapper showModal={showModal}>
                <ModalContent>
                  <ModalImg
                    src={require("../../images/avatar/" +
                      orderDetails.name.replace(/\s+/g, "").toLowerCase() +
                      ".jpg")}
                    alt="camera"
                  />
                  <ModalHeader>Order</ModalHeader>
                  {orderDetails.order.map((product, index) => {
                    return (
                      <ModalDetails key={index}>
                        <p>
                          {product.foodName} x{product.amount}
                        </p>
                        <p>
                          RM{" "}
                          {calculatePriceOfSingleItem(
                            product.amount,
                            product.price
                          )}
                        </p>
                      </ModalDetails>
                    );
                  })}
                  <ModalTotal>
                    Total: {calculateTotalPriceOfOrder(orderDetails.order)}
                  </ModalTotal>
                  <CancelButton onClick={openSecondaryModal}>
                    Cancel Order
                  </CancelButton>
                </ModalContent>
                <CloseModalButton
                  aria-label="Close modal"
                  onClick={() => {
                    setShowModal((prev) => !prev);
                    setAmount(0);
                  }}
                />
              </ModalWrapper>
            </Background>
          ) : null}
        </>
      );

    // 2: View Cart
    case 2:
      return (
        <>
          <SecondaryModal
            showSecondaryModal={showSecondaryModal}
            setShowSecondaryModal={setShowSecondaryModal}
            closeParentModal={setShowModal}
            secondaryModalType={modalType}
            resetCart={setCart}
            orderToBePlaced={cart}
          />
          {showModal ? (
            <Background onClick={closeModal} ref={modalRef}>
              <ModalWrapper showModal={showModal}>
                <ModalContent>
                  <ModalHeader>Your Cart</ModalHeader>
                  {cart === undefined || parseInt(cart.length) <= 0 ? (
                    <p style={{ paddingBottom: 10, color: "red" }}>
                      No Items In Cart !
                    </p>
                  ) : null}
                  {cart &&
                    cart.map((product, index) => {
                      return (
                        <ModalDetails key={index}>
                          <p>
                            {product.foodName} x{product.amount}
                          </p>
                          <p>
                            RM{" "}
                            {Number(
                              Math.round(
                                parseFloat(
                                  product.price * product.amount + "e" + 2
                                )
                              ) +
                                "e-" +
                                2
                            ).toFixed(2)}
                          </p>
                          <DeleteButton
                            onClick={() => {
                              removeOrderFromCart(product.id);
                            }}
                          >
                            -
                          </DeleteButton>
                        </ModalDetails>
                      );
                    })}
                  {(() => {
                    const totalPrice = calculateTotalPriceOfCart();
                    return (
                      <ModalTotal>
                        Total: RM{" "}
                        {Number(
                          Math.round(parseFloat(totalPrice + "e" + 2)) +
                            "e-" +
                            2
                        ).toFixed(2)}
                      </ModalTotal>
                    );
                  })()}
                  <CancelButton
                    disabled={cart === undefined || parseInt(cart.length) <= 0}
                    onClick={openSecondaryModal}
                  >
                    Confirm Order
                  </CancelButton>
                </ModalContent>
                <CloseModalButton
                  aria-label="Close modal"
                  onClick={() => {
                    setShowModal((prev) => !prev);
                    setAmount(0);
                    setType("");

                    if (cart.length <= 0) {
                      setName("");
                    }
                  }}
                />
              </ModalWrapper>
            </Background>
          ) : null}
        </>
      );
    default:
      break;
  }
};
