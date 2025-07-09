import "../assets/style.css";

const ChatbotCta = ({ text, ...props }) => {
  const isLinkMessage = text.startsWith("Click here:");
  const url = isLinkMessage ? text.split("Click here:")[1].trim() : "";

  return (
    <button type="button" className="chatbot-cta" {...props}>
      {isLinkMessage ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#0086AD",
            textDecoration: "underline",
            fontFamily: "Poppins",
            fontSize: "14px",
          }}
        >
          Click here: {url}
        </a>
      ) : (
        text
      )}
    </button>
  );
};

export default ChatbotCta;
