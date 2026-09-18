import { useState } from "react";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("English");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am the YMCA chatbot. Choose a topic or ask a question."
    }
  ]);

  const [input, setInput] = useState("");

  const getBotReply = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("early") || lowerInput.includes("founding")) {
      return "The YMCA was founded in 1844 in London by George Williams. It began as a movement to support young men during the Industrial Revolution.";
    }

    if (lowerInput.includes("community") || lowerInput.includes("program")) {
      return "YMCA community programs often include youth development, fitness, swimming, childcare, education, and family support services.";
    }

    if (lowerInput.includes("global") || lowerInput.includes("impact")) {
      return "The YMCA has a global presence and supports communities through education, wellness, leadership, and social responsibility programs.";
    }

    if (lowerInput.includes("modern")) {
      return "Modern YMCA centers support health, youth development, inclusion, community engagement, and family wellness.";
    }

    if (lowerInput.includes("hours")) {
      return "Our YMCA hours are Monday to Friday, 8 AM to 8 PM.";
    }

    if (lowerInput.includes("membership")) {
      return "You can visit the front desk or website for membership details.";
    }

    if (lowerInput.includes("location")) {
      return "Please visit the YMCA website to find your nearest location.";
    }

    return "Sorry, I do not understand that yet. Please ask about YMCA history, programs, global impact, modern YMCA, hours, membership, or location.";
  };

  const sendMessage = (customMessage) => {
    const messageText = customMessage || input;

    if (messageText.trim() === "") return;

    const userMessage = {
      sender: "user",
      text: messageText
    };

    const botMessage = {
      sender: "bot",
      text: getBotReply(messageText)
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      botMessage
    ]);

    setInput("");
  };

  const topics = [
    {
      title: "Early History & Founding",
      description: "Learn how the YMCA began and its original mission."
    },
    {
      title: "Community Programs",
      description: "Explore youth, fitness, education, and outreach programs."
    },
    {
      title: "Global Impact",
      description: "Discover how YMCA supports communities around the world."
    },
    {
      title: "Modern YMCA",
      description: "Learn how YMCA serves people today through local programs."
    }
  ];

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="logo">Y</div>
          <div>
            <h1>YMCA Chatbot</h1>
            <p>Learn about YMCA history, programs, and impact</p>
          </div>
        </div>

        <select
          className="language-select"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>Hindi</option>
        </select>
      </header>

      <main className="welcome">
        <section className="hero">
          <h2>Welcome to the YMCA Information Chatbot</h2>
          <p>
            Choose a topic below or type your question to learn more about YMCA
            services, history, and community programs.
          </p>
        </section>

        <section className="topic-grid">
          {topics.map((topic, index) => (
            <div className="topic-card" key={index}>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <button onClick={() => sendMessage(topic.title)}>Explore</button>
            </div>
          ))}
        </section>

        <section className="chat-card">
          <h2>Chat with YMCA Bot</h2>

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
            <button onClick={() => sendMessage()}>Send</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;