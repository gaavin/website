import { useState } from "react";
import { SSEListener } from "../SSEListener";
import { TamaButton } from "./tamaButton";
import ReactPlayer from "react-player";
import Draggable from "react-draggable";

import "./Tama.css";

export const Tama = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <Draggable>
      <div className="tama-container">
        <button
          onClick={() => {
            setIsMuted(!isMuted);
          }}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <div className="stream-container">
          <ReactPlayer
            url="http://live.gavinpower.dev:8889/live"
            controls={false}
            playing={true}
            muted={isMuted}
            playsinline // Add this if you want to play inline on iOS devices
          />
        </div>
        <div className="buttons-container">
          <SSEListener endpoint={"/api/events"}>
            <TamaButton command="A" />
            <TamaButton command="B" />
            <TamaButton command="C" />
          </SSEListener>
        </div>
      </div>
    </Draggable>
  );
};
