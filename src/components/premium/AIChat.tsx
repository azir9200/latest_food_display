"use client";
import { useState } from "react";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div>
      <h2>Restaurant AI Assistant</h2>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something about our menu…"
      />

      <button onClick={sendMessage}>Ask</button>

      {reply && (
        <p>
          <strong>AI:</strong> {reply}
        </p>
      )}
    </div>
  );
}
