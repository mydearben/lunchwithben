import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import {
  ProductsContainer,
  ProductsHeading,
  ProductWrapper,
  ProductTitle,
  ProductCard,
  ProductImg,
  ProductInfo,
  ProductDesc,
  ProductPrice,
  ProductButton,
} from "./ProductsElements";
import { Modal } from "../Modal";
import firebase from "../../firebase";
import moment from "moment";

const Products = ({ heading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = (selectedMenu) => {
    setSelectedOrder(selectedMenu);
    setShowModal((prev) => !prev);
  };

  const printDescription = (orderDetails) => {
    let description = "";

    orderDetails.forEach((order) => {
      if (order.foodName === orderDetails[orderDetails.length - 1].foodName) {
        description = description + order.foodName;
      } else {
        description = description + order.foodName + ", ";
      }
    });

    return description;
  };

  const calculateTotal = (orderDetails) => {
    let amount = 0;

    orderDetails.forEach((order) => {
      amount += Number(
        Math.round(parseFloat(order.amount * order.price + "e" + 2)) + "e-" + 2
      );
    });

    return "RM " + amount.toFixed(2);
  };

  // Upon loading the page for the first time, fetch all of the orders
  useEffect(() => {
    // Load the "orders" collection from the database
    // We might not receive any orders for the day (yet), so need to prepare for it
    const tempOrders = [];

    firebase
      .firestore()
      .collection("orders")
      .where("date", "==", moment().format("LL"))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let tempId = { id: doc.id };

          tempOrders.push({ ...tempId, ...doc.data() });
        });

        setOrders(tempOrders);
      })
      .then(setLoaded(true));
  }, []);

  // Should the "orders" array change (i.e someone cancelled their order), we would need to refetch the
  // data again. (I'm not sure if there is any other better way to do it, can revisit later if there is)
  useEffect(() => {
    // Re-load the "orders" collection from the database
    const tempOrders = [];

    firebase
      .firestore()
      .collection("orders")
      .where("date", "==", moment().format("LL"))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let tempId = { id: doc.id };

          tempOrders.push({ ...tempId, ...doc.data() });
        });

        setOrders(tempOrders);
      })
      .then(setLoaded(true));
  }, [toggleRefresh]);

  if (!loaded) {
    return null;
  } else {
    return (
      <>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          modalType={1}
          orderDetails={selectedOrder}
          toggleRefresh={toggleRefresh}
          setToggleRefresh={setToggleRefresh}
        />
        <ProductsContainer>
          <ProductsHeading>
            <Navbar toggle={toggle} heading={heading} />
            <Sidebar isOpen={isOpen} toggle={toggle} />
          </ProductsHeading>
          {orders.length > 0 ? (
            <ProductWrapper>
              {orders.map((product, index) => {
                return (
                  <ProductCard key={index}>
                    <ProductImg
                      src={require("../../images/avatar/" +
                        product.name.replace(/\s+/g, "").toLowerCase() +
                        ".jpg")}
                      alt={product}
                    />
                    <ProductInfo>
                      <ProductTitle>{product.name}</ProductTitle>
                      <ProductDesc>
                        {printDescription(product.order)}
                      </ProductDesc>
                      <ProductPrice>
                        {calculateTotal(product.order)}
                      </ProductPrice>
                      <ProductButton onClick={() => openModal(product)}>
                        View Order
                      </ProductButton>
                    </ProductInfo>
                  </ProductCard>
                );
              })}
            </ProductWrapper>
          ) : (
            <ProductWrapper>
              <h1>No Orders Received Yet !</h1>
            </ProductWrapper>
          )}
        </ProductsContainer>
      </>
    );
  }
};

export default Products;
