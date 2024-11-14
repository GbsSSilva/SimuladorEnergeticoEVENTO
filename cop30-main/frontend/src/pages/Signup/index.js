// src/pages/Signup/index.js
import React, { useState } from "react";
import * as C from "./styles";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConf, setSenhaConf] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConf, setShowPasswordConf] = useState(false);
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!email || !senha || !senhaConf) {
      setError("Preencha todos os campos");
      return;
    } else if (senha !== senhaConf) {
      setError("As senhas não são iguais");
      return;
    }

    const res = await signup(email, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("/home");
  };

  return (
    <C.PageContainer>
      <C.LeftPanel>
        <C.BackgroundText>COP-30 Sustentável</C.BackgroundText>
      </C.LeftPanel>

      <C.RightPanel>
        <C.Label>Cadastro de Conta</C.Label>
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
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </C.PasswordToggle>
          </C.PasswordContainer>
          <C.PasswordContainer>
            <C.InputField
              type={showPasswordConf ? "text" : "password"}
              placeholder="Confirme sua Senha"
              value={senhaConf}
              onChange={(e) => [setSenhaConf(e.target.value), setError("")]}
            />
            <C.PasswordToggle onClick={() => setShowPasswordConf(!showPasswordConf)}>
              {showPasswordConf ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </C.PasswordToggle>
          </C.PasswordContainer>
          {error && <C.LabelError>{error}</C.LabelError>}
          <Button Text="Inscrever-se" onClick={handleSignup} />
          <C.LabelSignin>
            Já tem uma conta?
            <C.Strong>
              <Link to="/signin">&nbsp;Entre</Link>
            </C.Strong>
          </C.LabelSignin>
        </C.Content>
      </C.RightPanel>
    </C.PageContainer>
  );
};

export default Signup;
