// src/pages/Signin/styles.js
import styled, { keyframes } from "styled-components";
import bgImage from "../../components/img/bgcop303.webp";
import Button from "../../components/Button"; // Importando o componente Button

// Animação de fade-in
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px); /* Sobe o elemento */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const LeftPanel = styled.div`
  flex: 1;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s ease-out; /* Animação de fade-in */
`;

export const BackgroundText = styled.h1`
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.9);
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px 40px;
  border-radius: 10px;
  text-align: center;
  animation: ${fadeIn} 1.2s ease-out; /* Animação de fade-in */
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  animation: ${fadeIn} 1.4s ease-out; /* Animação de fade-in */
`;

export const Container = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: ${fadeIn} 1.6s ease-out; /* Animação de fade-in */
`;

export const Label = styled.h2`
  font-size: 2rem;
  color: #2d572c;
  margin-bottom: 20px;
  font-weight: 600;
  animation: ${fadeIn} 1.8s ease-out; /* Animação de fade-in */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  animation: ${fadeIn} 2s ease-out; /* Animação de fade-in */
`;

export const labelError = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin: 10px 0;
  animation: ${fadeIn} 2.2s ease-out; /* Animação de fade-in */
`;

export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: #444;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  animation: ${fadeIn} 2.4s ease-out; /* Animação de fade-in */

  &:hover {
    background-color: #e0e0e0;
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

export const LabelSignup = styled.p`
  font-size: 0.9rem;
  color: #666;
  animation: ${fadeIn} 2.6s ease-out; /* Animação de fade-in */
`;

export const Strong = styled.strong`
  color: #2d572c;
  font-weight: bold;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #2d572c; 
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra leve */
  color: #333;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:focus {
    border-color: #245f2c; /* Cor de borda mais escura ao focar */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Aumenta a sombra ao focar */
    outline: none;
  }
`;

// Personalizando o botão de login
export const LoginButton = styled(Button)`
  background-color: #2d572c;
  color: white;
  font-weight: bold;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  animation: ${fadeIn} 2s ease-out; /* Animação de fade-in */

  &:hover {
    background-color: #245f2c;
  }
`;

export const ForgotPasswordLink = styled.p`
  font-size: 0.9rem;
  color: #2d572c;
  cursor: pointer;
  margin-top: 15px;
  text-align: center;
  text-decoration: underline;

  &:hover {
    color: #1a4018;
  }
`;