// src/pages/ForgotPassword/index.js
import React, { useState } from "react";
import { auth } from "../../firebase/firebase"; // Certifique-se de que o caminho está correto
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import * as C from "./styles";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Por favor, insira o seu e-mail.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Um link de redefinição de senha foi enviado para o seu e-mail.");
      setError("");
    } catch (error) {
      console.error("Erro ao enviar o e-mail de redefinição:", error);
      setError("Erro ao enviar o e-mail. Verifique o e-mail inserido.");
    }
  };

  return (
    <C.Container>
      <C.Label>Redefinir Senha</C.Label>
      <C.Content>
        <C.InputField
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError(""), setMessage("")]}
        />
        <C.labelError>{error}</C.labelError>
        <C.labelMessage>{message}</C.labelMessage>
        <C.Button onClick={handlePasswordReset}>Enviar link de redefinição</C.Button>
        <C.BackLink onClick={() => navigate("/signin")}>Voltar para Login</C.BackLink>
      </C.Content>
    </C.Container>
  );
};

export default ForgotPassword;
