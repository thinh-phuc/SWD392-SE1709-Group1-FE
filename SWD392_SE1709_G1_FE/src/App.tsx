import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm FPT AI Assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    setMessages([...messages, { text: inputMessage, sender: "user" }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Thanks for your message. Our AI is processing your request.",
          sender: "bot",
        },
      ]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/2560px-FPT_logo_2010.svg.png"
            alt="FPT Logo"
            className="logo"
          />
        </div>
        <h1>FPT AI Chatbot</h1>
        <div className="header-actions">
          <button className="theme-toggle">
            <span role="img" aria-label="Dark Mode">
              🌙
            </span>
          </button>
        </div>
      </header>

      <main className="chat-container">
        <div className="messages-area">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-bubble">{message.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="message-input"
          />
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            Send
          </button>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2023 FPT University. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
