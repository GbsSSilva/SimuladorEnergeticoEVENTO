// src/components/Input/styles.js
import styled from "styled-components";

export const Input = styled.input`
  outline: none;
  padding: 16px 20px;
  width: 100%;
  border-radius: 5px;
  font-size: 16px;
  background-color: #f0f2f5;
  border: 2px solid #2d572c; 
  color: #333;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); 
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #245f2c; 
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
    background-color: #ffffff; 
  }
`;
