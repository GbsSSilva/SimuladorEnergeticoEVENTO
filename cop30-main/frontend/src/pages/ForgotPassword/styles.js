// src/pages/ForgotPassword/styles.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
`;

export const Label = styled.h2`
  color: #2d572c;
  margin-bottom: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputField = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #2d572c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #245f2c;
  }
`;

export const labelError = styled.p`
  color: #ff6b6b;
  margin-top: 10px;
`;

export const labelMessage = styled.p`
  color: #2d572c;
  margin-top: 10px;
`;

export const BackLink = styled.p`
  color: #2d572c;
  cursor: pointer;
  margin-top: 20px;
  text-align: center;
  text-decoration: underline;

  &:hover {
    color: #1a4018;
  }
`;
