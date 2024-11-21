import styled from "styled-components";
import backgroundImage from '../../components/img/back.webp';

// Container principal com o fundo gradiente e imagem de fundo
export const BodyContainer = styled.div`
  background: linear-gradient(
      rgba(29, 53, 87, 0.8),
      rgba(69, 123, 157, 0.8)
    ),
    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Garante que a altura mínima seja 100% da tela */
  margin: 0;
`;

// Container com fundo arredondado
export const MainBackground = styled.div`
  background-color: rgba(245, 252, 206, 0.9); /* Fundo arredondado com leve transparência */
  padding: 40px;
  border-radius: 30px;
  max-width: 900px; /* Aumenta o espaço do questionário */
  text-align: center;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1); /* Sombra suave */

  @media screen and (max-width: 768px) {
    padding: 20px;
    max-width: 95%;
    border-radius: 20px;
  }
`;

// Container principal do questionário
export const QuestionnaireContainer = styled.div`
  background-color: #fcf6e9;
  padding: 30px;
  border-radius: 20px;
  width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: left;
  margin-bottom: 20px; /* Para dar espaço entre o questionário e o botão de home */

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

// Título do questionário
export const QuestionTitle = styled.h2`
  font-size: 2rem;
  color: #2d4a60;
  margin-bottom: 20px;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Estilo das perguntas
export const QuestionContainer = styled.div`
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

// Texto das perguntas
export const QuestionText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Container das opções de resposta
export const RadioContainer = styled.div`
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

// Estilo dos rótulos de opções de resposta
export const RadioLabel = styled.label`
  display: block;
  font-size: 1rem;
  margin: 10px 0;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    margin: 8px 0;
  }
`;

// Estilo dos botões de navegação
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px; /* Espaço entre os botões */
    margin-top: 15px;
  }
`;

// Estilo para os botões 'Voltar' e 'Próxima'
export const Button = styled.button`
  background-color: #00af5b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #008f4c;
  }

  @media screen and (max-width: 768px) {
    width: 100%; /* Botões ocupam toda a largura */
    font-size: 0.9rem;
  }
`;

// Estilo do botão 'Home'
export const HomeButton = styled(Button)`
  background-color: #007bff;

  &:hover {
    background-color: #0056b3;
  }

  @media screen and (max-width: 768px) {
    margin-top: 15px;
  }
`;

export const ProgressCounter = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #2d4a60;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Estilo para mensagens de erro
export const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 0.9rem;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;