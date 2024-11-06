// src/pages/Signup/styles.js
import styled from "styled-components";
import bgImage from "../../components/img/bgcop304.jpg";

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

export const Container = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
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
`;

export const LabelError = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin: 10px 0;
`;

export const LabelSignin = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

export const Strong = styled.strong`
  color: #2d572c;
  font-weight: bold;
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