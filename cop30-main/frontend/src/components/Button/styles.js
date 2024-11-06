// src/components/Button/styles.js
import styled from "styled-components";

export const Button = styled.button`
  padding: 16px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  background-color: ${(props) => props.bgColor}; 
  color: white;
  font-weight: 600;
  font-size: 16px;
  max-width: 350px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.bgColor === "#2d572c" ? "#245f2c" : "#035bbf"}; /* Altera a cor ao passar o mouse */
  }
`;
