import styled from "styled-components";
import Select from "react-select";

export const PageDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: black;
  flex-direction: column;
`;

export const AdminHeading = styled.h1`
  font-size: clamp(2rem, 2.5vw, 3rem);
  text-align: center;
  margin-bottom: 5rem;
  cursor: pointer;
`;

export const CoverContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

export const CoverDiv = styled.div`
  background-color: white;
  width: 20em;
  height: 25em;
  border-radius: 1em;
  box-shadow: 0 0.188em 1.55em rgb(156, 156, 156);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const InputDiv = styled.input`
  border: none;
  background-color: rgb(229, 226, 226);
  height: 4em;
  width: 80%;
  border-radius: 0.25em;
  text-align: center;
  padding: 2em;

  &:focus {
    outline-color: rgb(32, 177, 255);
  }
`;

export const CoverHeader = styled.h1`
  margin-bottom: 1rem;
  box-shadow: 0 4px 2px -2px gray;
  letter-spacing: 1px;
  font-size: 1.5rem;
`;

export const RestaurantList = styled(Select)`
  min-width: 65%;
`;

export const ConfirmButton = styled.button`
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
