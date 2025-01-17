import React from "react";
import "../App.css";
import jeoopardyVideo from "../Jeopardy_Intro_Short2.mp4";

export default function IntroVideo(props) {
    return (
      <div className="video-modal">
        <video height="100%" width="100%" src={jeoopardyVideo} autoPlay onEnded={() => props.videoEnded(1)} onClick={() => props.videoEnded(1)} />
      </div>
    );
};