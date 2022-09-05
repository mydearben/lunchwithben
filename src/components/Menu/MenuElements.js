import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";

export const MenuContainer = styled.div`
  /* width: 100vw; */
  min-height: 100vh;
  background: #150f0f;
  color: #fff;
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

export const MenuCard = styled.div`
  margin: 0 2.5rem 2.5rem 2.5rem;
  line-height: 2;
  width: 250px;
`;

export const MenuImg = styled.img`
  height: 250px;
  min-width: 250px;
  max-width: 100%;
  box-shadow: 8px 8px #fdc500;
`;

export const MenuHeading = styled.h1`
  font-size: clamp(2rem, 2.5vw, 3rem);
  text-align: center;
  margin-bottom: 5rem;
  cursor: pointer;
`;

export const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  text-align: center;
`;

export const MenuTitle = styled.h2`
  font-weight: 400;
  font-size: 1.5rem;
  box-shadow: 0px 5px #e9ba23;
`;

export const MenuDesc = styled.p`
  margin-bottom: 1rem;
  border-top: 20px solid transparent;
`;

export const MenuPrice = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

export const MenuButton = styled.button`
  font-size: 1rem;
  padding: 1rem 1rem;
  border: none;
  background: #e31837;
  color: #fff;
  transition: 0.2 ease-out;

  &:hover {
    background: #ffc500;
    transition: 0.2s ease-out;
    cursor: pointer;
    color: #000;
  }
`;

export const CartContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #000;
`;

export const CartIcon = styled(FaShoppingCart)`
  margin-right: 0.9rem;
  font-size: 1.4rem;
  vertical-align: middle;

  &:hover {
    cursor: pointer;
  }
`;

export const CartButton = styled.button`
  font-size: 1.4rem;
  padding: 1rem 4rem;
  border: none;
  background: #ffc500;
  color: #000;
  transition: 0.2s ease-out;
  display: flex;

  &:hover {
    background: #5cd4f2;
    transition: 0.2s ease-out;
    cursor: pointer;
    color: #000;
  }

  &:disabled {
    background: gray;
  }
`;

export const ScrollToBottomContainer = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #ffc500;
  z-index: 1;
`;

export const ScrollToBottomIcon = styled(FaShoppingCart)`
  width: 40%;
  height: 40%;
  color: #000;
  margin-top: 15px;
  margin-left: 15px;
  animation: scrollTop 0.5s alternate ease infinite;
`;
