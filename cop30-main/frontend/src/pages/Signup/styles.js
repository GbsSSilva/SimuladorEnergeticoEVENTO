// src/pages/Signup/styles.js
import styled, { keyframes } from "styled-components";
import bgImage from "../../components/img/bgcop304.jpg";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const maxWidth = "350px"; // Tamanho máximo para todos os elementos

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  flex: 1;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s ease-out;
`;

export const BackgroundText = styled.h1`
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.9);
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px 40px;
  border-radius: 10px;
  text-align: center;
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const Label = styled.h2`
  font-size: 2rem;
  color: #2d572c;
  margin-bottom: 20px;
  font-weight: 600;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  max-width: ${maxWidth};
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #2d572c;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:focus {
    border-color: #245f2c;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    outline: none;
  }
`;

export const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordToggle = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
`;

export const LabelError = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin: 10px 0;
  text-align: center;
`;

export const LabelSignin = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

export const Strong = styled.strong`
  color: #2d572c;
  cursor: pointer;
`;
