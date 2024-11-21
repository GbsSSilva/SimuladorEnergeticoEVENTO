import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import chatbotIcon from "./img/chatbot.svg";

const Chatbot = ({ isOpen, toggleChat }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Olá 👋\nComo posso ajudá-lo hoje?" },
  ]);
  const chatboxRef = useRef(null);
  const inputRef = useRef(null);

  const API_KEY = "AIzaSyB-erBrsd9JBB345Nub_RD1dtVSBTKaIKU";
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setChatHistory((prev) => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");

    // Adiciona mensagem de carregamento
    const loadingMessage = { sender: "bot", text: "Carregando..." };
    setChatHistory((prev) => [...prev, loadingMessage]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }],
            },
          ],
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      const botMessage =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Desculpe, não consegui entender.";
      setChatHistory((prev) => {
        const updatedHistory = [...prev];
        updatedHistory.pop(); // Remove a mensagem de carregamento
        return [...updatedHistory, { sender: "bot", text: botMessage }];
      });
    } catch (error) {
      setChatHistory((prev) => {
        const updatedHistory = [...prev];
        updatedHistory.pop(); // Remove a mensagem de carregamento
        return [
          ...updatedHistory,
          { sender: "bot", text: `Erro: ${error.message}` },
        ];
      });
    } finally {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={`chatbot ${isOpen ? "open" : "closed"}`}>
      <div className="chatbot-header">
        <h4>EcoBot</h4>
        <button className="close-btn" onClick={toggleChat}>
          X
        </button>
      </div>
      <div className="chatbot-body" ref={chatboxRef}>
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender}`}>
            {chat.sender === "bot" && (
              <img src={chatbotIcon} alt="Bot" className="chatbot-avatar" />
            )}
            <p>{chat.text}</p>
          </div>
        ))}
      </div>
      <div className="chatbot-footer">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          className="chatbot-input"
        />
        <button onClick={handleSendMessage} className="chatbot-send-btn">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
