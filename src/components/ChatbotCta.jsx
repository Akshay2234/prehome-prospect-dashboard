import "../assets/style.css";

const ChatbotCta = ({text, ...props }) => {
 
  


  return (
    <button
      type="button"
    className=" chatbot-cta"
      {...props} // Spread any additional props for customization
    >
      {text}
    </button>
  );
};

export default ChatbotCta;
