const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("YMCA Chatbot Backend is running");
});

app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message.toLowerCase();

  let reply = "Sorry, I do not understand that yet.";

  if (userMessage.includes("hours")) {
    reply = "Our YMCA hours are Monday to Friday, 8 AM to 8 PM.";
  } else if (userMessage.includes("membership")) {
    reply = "You can visit the front desk or website for membership details.";
  } else if (userMessage.includes("program")) {
    reply = "We offer fitness, swimming, youth, and community programs.";
  } else if (userMessage.includes("location")) {
    reply = "Please visit the YMCA website to find your nearest location.";
  }

  res.json({ reply });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});