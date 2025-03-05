import React, { useState, useEffect } from "react";
import './App.css'

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && input.trim() !== "") {
      socket.send(input);
      setInput("");
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">WebSocket Chat</h2>
      <div className="border p-2 h-64 overflow-y-auto bg-gray-100 mb-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-1 border-b">{msg}</div>
        ))}
      </div>
      <input
        type="text"
        className="border p-2 w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 w-full"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default ChatApp;