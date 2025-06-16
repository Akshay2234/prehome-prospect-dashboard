import React, { useState } from "react";
import { chatbotNodes } from "../data/chatbotData";
import ChatbotCta from "./ChatbotCta";
import ChatbotOutlineCta from "./ChatbotOutlineCta";

const DynamicChatbot = () => {
  const [currentNodeId, setCurrentNodeId] = useState("root");
  const currentNode = chatbotNodes[currentNodeId];

  const handleOptionClick = (nextId) => {
    setCurrentNodeId(nextId);
  };

  return (
    <div className="chat-container">
      <ChatbotCta text={currentNode.message} />
      <div className="cta-container mt-3">
        {currentNode.options.map((option, index) => (
          <ChatbotOutlineCta
            key={index}
            text={option.text}
            onClick={() => handleOptionClick(option.nextId)}
          />
        ))}
      </div>
    </div>
  );
};

export default DynamicChatbot;
