import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

export const ModalWrapper = styled.div`
  width: 300px;
  height: 200px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
`;

export const ModalHeader = styled.h1`
  margin-bottom: 1rem;
  box-shadow: 0 4px 2px -2px #000;
  letter-spacing: 1px;
  font-size: 1.1rem;
`;

export const ModalDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  padding-left: 5px;
  padding-right: 5px;

  button {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

export const YesButton = styled.button`
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  background: #22ff00;
  color: #fff;
  transition: 0.2s ease-out;

  &:hover {
    background: #167807;
    transition: 0.2s ease-out;
    cursor: pointer;
    color: #000;
  }
`;

export const NoButton = styled.button`
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  background: #e31837;
  color: #fff;
  transition: 0.2s ease-out;

  &:hover {
    background: #eb787a;
    transition: 0.2s ease-out;
    cursor: pointer;
    color: #000;
  }
`;
