// src/pages/Signin/index.js
import React, { useState } from "react";
import * as C from "./styles";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/home");
    } catch (error) {
      setError("Falha no login. Verifique suas credenciais.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      setError("Falha no login com Google.");
    }
  };

  return (
    <C.PageContainer>
      <C.LeftPanel>
        <C.BackgroundText>COP-30 Sustentável</C.BackgroundText>
      </C.LeftPanel>
      <C.RightPanel>
        <C.Label>Faça seu Login!</C.Label>
        <C.Content>
          <C.InputField
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <C.PasswordContainer>
            <C.InputField
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua Senha"
              value={senha}
              onChange={(e) => [setSenha(e.target.value), setError("")]}
            />
            <C.PasswordToggle onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </C.PasswordToggle>
          </C.PasswordContainer>
          <C.ForgotPasswordLink>
            <Link to="/forgot-password">Esqueceu sua senha?</Link>
          </C.ForgotPasswordLink>
          {error && <C.labelError>{error}</C.labelError>}
          <Button Text="Entrar" onClick={handleLogin} />
          <C.GoogleButton onClick={handleGoogleLogin}>
            <FcGoogle size={24} />
            <span>Entrar com Google</span>
          </C.GoogleButton>
          <C.LabelSignup>
            Não tem uma conta?
            <C.Strong>
              <Link to="/signup">&nbsp;Registre-se</Link>
            </C.Strong>
          </C.LabelSignup>
        </C.Content>
      </C.RightPanel>
    </C.PageContainer>
  );
};

export default Signin;
