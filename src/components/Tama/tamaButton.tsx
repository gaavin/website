import { useState, useEffect } from "react";
import { sendCommand } from "./sendCommand";
import { useSSEListener } from "../SSEListener";
import "./TamaButton.css";

const TamaButton = ({ command }: { command: "A" | "B" | "C" }) => {
  const [isPressed, setIsPressed] = useState(false);
  const message = useSSEListener();

  useEffect(() => {
    console.log(`asdasd: ${message}`);
    if (message === `${command}-press`) {
      setIsPressed(true);
    }
    if (message === `${command}-release`) {
      setIsPressed(false);
    }
  }, [message, command]);

  const handleClick = () => {
    console.log(`Client pressed ${command}`);
    sendCommand(command);
  };

  return (
    <button
      className={`tama-button ${isPressed ? "pressed" : ""}`}
      onClick={handleClick}
    >
      {command}
    </button>
  );
};

export default TamaButton;
