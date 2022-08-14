import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import Select from "react-select";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  width: 300px;
  height: 500px;
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

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const ModalHeader = styled.h1`
  margin-bottom: 1rem;
  box-shadow: 0 4px 2px -2px gray;
  letter-spacing: 1px;
  font-size: 1.5rem;
`;

export const CancelButton = styled.button`
  font-size: 0.8rem;
  padding: 10px 20px;
  border: none;
  background: #e31837;
  color: #fff;
  transition: 0.2s ease-out;

  &:hover {
    background: #ffc500;
    transition: 0.2s ease-out;
    cursor: pointer;
    color: #000;
  }

  &:disabled {
    opacity: 0.65;
    background: #000;
    transition: 0s;
  }
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

  p {
    margin-bottom: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

export const ModalImg = styled.img`
  height: 125px;
  min-width: 125px;
  max-width: 100%;
  box-shadow: 8px 8px #fdc500;
  margin-bottom: 0.75rem;
`;

export const ModalTotal = styled.p`
  margin-bottom: 1rem;
  letter-spacing: 1px;
  border-color: gray;
  border-style: dashed;
  border-width: 2px 0px 2px 0px;
`;

export const PlusButton = styled(FaPlusCircle)`
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 25px;

  &:hover {
    cursor: pointer;
  }
`;

export const MinusButton = styled(FaMinusCircle)`
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 25px;

  &:hover {
    cursor: pointer;
  }
`;

export const NameList = styled(Select)`
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;
