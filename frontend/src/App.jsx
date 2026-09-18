import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am the YMCA chatbot. How can I help you?" }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      sender: "user",
      text: input
    };

    setMessages((previousMessages) => [...previousMessages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: input
      });

      const botMessage = {
        sender: "bot",
        text: response.data.reply
      };

      setMessages((previousMessages) => [...previousMessages, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I could not connect to the backend server."
      };

      setMessages((previousMessages) => [...previousMessages, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="app">
      <div className="chat-card">
        <h1>YMCA Chatbot</h1>

        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <strong>{message.sender === "user" ? "You" : "Bot"}:</strong>{" "}
              {message.text}
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;