import { useState } from 'react';
import axios from 'axios';
import './chat.css';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock chat responses to simulate backend functionality
  const getMockResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to the Physical AI and Humanoid Robotics assistant. How can I help you with robotics today?";
    } else if (message.includes('rob') || message.includes('robot')) {
      return "Robotics is an exciting field! Are you interested in learning about ROS 2, simulation, or humanoid design? I can guide you to the right resources.";
    } else if (message.includes('ai') || message.includes('intellig')) {
      return "Artificial Intelligence in robotics is fascinating! From vision-language-action systems to autonomous control, there's a lot to explore in our textbook.";
    } else if (message.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with regarding robotics or AI?";
    } else if (message.includes('bye') || message.includes('goodbye')) {
      return "Goodbye! Feel free to return if you have more questions about robotics and AI.";
    } else if (message.includes('help')) {
      return "I can help you with information about robotics, AI, ROS 2, simulation, hardware basics, VLA systems, and more. What topic interests you?";
    } else if (message.includes('textbook') || message.includes('learn')) {
      return "Our textbook covers ROS 2 Foundations, Simulation & Digital Twins, Hardware Basics, VLA Systems, Advanced AI & Motion Control, and Humanoid Design. Which module would you like to explore?";
    } else {
      const responses = [
        "That's interesting! Our textbook covers many aspects of physical AI and humanoid robotics. Would you like to know more about a specific topic?",
        "I'm here to help with information about robotics and AI. Have you checked out our modules on ROS 2, simulation, or humanoid design?",
        "Great question! In our textbook, we cover everything from beginner concepts to advanced topics like VLA (Vision-Language-Action) systems.",
        "Interesting! The field of humanoid robotics is rapidly evolving. Our textbook provides hands-on learning approaches for understanding these systems.",
        "I'd be happy to provide information about robotics concepts. Would you like to know more about simulation, control theory, or hardware design?",
        "That's a great topic in robotics! Our curriculum covers both theoretical concepts and practical implementations."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const currentInput = input;

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      console.log("Sending message:", currentInput);

      // First, try the real backend
      const res = await axios.post("https://backend-deploy-yt.onrender.com/chat", {
        message: currentInput
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000 // 5 second timeout
      });

      console.log("Response received:", res);
      console.log("Response data:", res.data);

      const botReply = res.data.reply || res.data.response || res.data.message || "No response from server";
      const botMessage = { sender: "bot", text: botReply };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error details:", err);
      console.error("Error response:", err.response);

      // If backend fails, use mock response
      console.log("Using mock response due to backend error");
      const mockResponse = getMockResponse(currentInput);
      const botMessage = { sender: "bot", text: mockResponse };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <button className="chat-button" onClick={() => setOpen(!open)}>
        💬 Chat
      </button>
      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <strong>AI Assistant</strong>
          </div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="bubble bot">
                <em>Thinking...</em>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type message..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
