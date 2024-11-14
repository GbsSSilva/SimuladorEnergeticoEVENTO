import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import "./header.css";

const Header = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signout();
    navigate("/");
  };

  // Função para alternar o menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header>
      <nav id="navbar">
        {/* Logo */}
        <div id="nav_logo">
          COP30 Sustentável
          <p>Consumo energético consciente</p>
        </div>

        {/* Menu Desktop */}
        <ul id="nav_list">
          <li className="nav-item">
            <a href="#home">Início</a>
          </li>
          <li className="nav-item">
            <a href="#servicos">Como Economizar</a>
          </li>
          <li className="nav-item">
            <a href="#sobre">Sobre a COP-30</a>
          </li>
        </ul>

        {/* Botão de Logout */}
        <div id="cta_header">
          <Button Text="Voltar para o login" onClick={handleLogout} />
        </div>

        {/* Botão Sanduíche para Mobile */}
        <button id="mobile_btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>
      </nav>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div id="mobile_menu">
          <ul id="mobile_nav_list">
            <li className="nav-item">
              <a href="#home" onClick={toggleMobileMenu}>Início</a>
            </li>
            <li className="nav-item">
              <a href="#servicos" onClick={toggleMobileMenu}>Como Economizar</a>
            </li>
            <li className="nav-item">
              <a href="#sobre" onClick={toggleMobileMenu}>Sobre a COP-30</a>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout}>Voltar para o login</button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;