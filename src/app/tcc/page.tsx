
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const menuLinks = [
  { href: "#", label: "Sobre" },
  { href: "#", label: "Recursos" },
  { href: "#", label: "Fóruns" },
  { href: "#", label: "Jogos" },
  { href: "#", label: "Contato" },
];

function getBotResponse(userMessage: string) {
  const lowerMsg = userMessage.toLowerCase();
  if (lowerMsg.includes("oi") || lowerMsg.includes("olá")) {
    return "Olá! Bem-vindo ao BrainWave Connect. 😊";
  } else if (lowerMsg.includes("ajuda")) {
    return "Posso ajudar com: <br>• Informações<br>• Suporte técnico<br>• Dúvidas sobre sua conta";
  } else if (lowerMsg.includes("contato")) {
    return "Nosso email: contato@brainwave.com<br>Telefone: (11) 1234-5678";
  } else if (lowerMsg.includes("serviço") || lowerMsg.includes("recursos")) {
    return "Nós oferecemos:<br>- Fóruns de discussão<br>- Jogos educativos<br>- Artigos exclusivos<br>- Suporte personalizado";
  } else if (lowerMsg.includes("conta") || lowerMsg.includes("login")) {
    return "Para questões de conta, visite nossa página de login ou clique em 'Esqueci minha senha' se necessário.";
  } else if (lowerMsg.includes("obrigado") || lowerMsg.includes("obrigada")) {
    return "De nada! Estou sempre aqui para ajudar. 😊";
  } else if (lowerMsg.includes("comunidade")) {
    return "Nossa comunidade é o coração do BrainWave Connect! Juntos aprendemos e crescemos mais rápido.";
  } else {
    return "Desculpe, não entendi. Pode reformular?";
  }
}

function getCurrentTime() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
}

export default function TccPage() {
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot"; time: string }>>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mensagem de boas-vindas inicial
    setTimeout(() => {
      addBotMessage("Olá! Eu sou o assistente virtual da BrainWave Connect. Como posso te ajudar hoje?");
    }, 500);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Scroll para baixo ao adicionar mensagem
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  function addUserMessage(text: string) {
    setMessages((msgs) => [
      ...msgs,
      { text, sender: "user", time: getCurrentTime() },
    ]);
  }

  function addBotMessage(text: string) {
    setMessages((msgs) => [
      ...msgs,
      { text, sender: "bot", time: getCurrentTime() },
    ]);
  }

  function sendMessage() {
    const message = input.trim();
    if (!message) return;
    addUserMessage(message);
    setInput("");
    setTimeout(() => {
      addBotMessage(getBotResponse(message));
    }, 1000);
  }

  function handleInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <div className="min-h-screen bg-white text-[#333] font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="header bg-white flex items-center max-w-[1200px] min-h-[100px] mx-auto px-5 py-5">
        <div className="logo-titulo flex items-center gap-2">
          <Image 
            src="/imagens/logo_branca.jpg" 
            alt="Logo BrainWave Connect" 
            width={50} 
            height={50} 
            className="logo" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://via.placeholder.com/50x50?text=Logo";
            }}
          />
          <h1 className="font-montserrat text-[26px] text-[#071D3B] m-0">BrainWave Connect</h1>
        </div>
        <nav className="menu flex gap-5 ml-auto">
          {menuLinks.map((link) => (
            <a key={link.label} href={link.href} className="pl-7 text-[14px] text-[#071D3B] hover:text-[#F6B600] transition-colors duration-300">
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Chat Section */}
      <section className="chat-section py-10 px-5 max-w-[800px] mx-auto w-full">
        <div className="chat-container border border-[#e0e0e0] rounded-[15px] overflow-hidden shadow-lg bg-white">
          <div className="chat-header bg-[#071D3B] text-white py-4 px-5 font-montserrat text-lg flex items-center gap-2">
            <i className="fas fa-comments" /> Chat de Suporte
          </div>
          <div ref={chatRef} className="chat-messages h-[400px] overflow-y-auto p-5 bg-[#f9f9f9]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${msg.sender === "user" ? "user-message bg-[#F6B600] text-[#071D3B] ml-auto rounded-br-[5px]" : "bot-message bg-[#071D3B] text-white mr-auto rounded-bl-[5px]"} max-w-[70%] mb-4 p-3 rounded-[18px] text-[0.95rem] leading-tight relative animate-fadeIn`}
                style={{ wordWrap: "break-word" }}
                dangerouslySetInnerHTML={{ __html: msg.text + `<span class='message-time block text-[0.7rem] opacity-70 mt-1 text-right'>${msg.time}</span>` }}
              />
            ))}
          </div>
          <div className="chat-input-area flex p-4 bg-white border-t border-[#eee]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKey}
              placeholder="Digite sua mensagem..."
              autoComplete="off"
              className="flex-1 p-3 border border-[#ddd] rounded-full font-sans outline-none transition-all focus:border-[#071D3B]"
            />
            <button
              onClick={sendMessage}
              className="bg-[#071D3B] text-white border-none rounded-full px-6 ml-3 cursor-pointer transition-colors duration-300 font-montserrat hover:bg-[#0a2a5a]"
            >
              Enviar
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-[#071D3B] text-white py-5 text-center">
        <p className="mb-2">&copy; 2025 BrainWave Connect. Todos os direitos reservados.</p>
        <div>
          <a href="#" className="text-white mx-2 hover:text-[#F6B600] transition-colors">Política de Privacidade</a>
          <a href="#" className="text-white mx-2 hover:text-[#F6B600] transition-colors">Termos de Uso</a>
        </div>
      </footer>

      {/* Font imports for Montserrat and Open Sans */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@400;700&display=swap');
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-sans { font-family: 'Open Sans', sans-serif; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
      {/* Font Awesome CDN for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    </div>
  );
}
