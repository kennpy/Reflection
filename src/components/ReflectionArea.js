import React, { useState } from "react";
import Prompt from "./Prompt";
import AudioElement from "./Audio";
import FetchTemplateButton from "./FetchTemplateButton";
import ReflectionTextEntry from "./ReflectionTextEntry";
import { AudioCaptions } from "./AudioCaptions";

function ReflectionArea() {
  // Get reflection info and pass it to components
  const [caption, setCaption] = useState("");
  const [soundStatus, setSoundStatus] = useState(False);
  const [startingTime, setStartingTime] = useState(0);
  const [caption, setCaption] = useState("");
  const [audioSource, setAudioSource] = useState("/DEFAULT.mp3");
  return (
    <div className="reflectionArea">
      <FetchTemplateButton
        setCaption={setCaption}
        setAudioSource={setAudioSource}
        setSoundStatus={setSoundStatus}
        setStartingTime={setStartingTime}
      />
      <Prompt />
      <AudioElement
        source={audioSource}
        playSound={soundStatus}
        startingTime={startingTime}
      />
      <AudioCaptions caption={caption} />
      <ReflectionTextEntry />
    </div>
  );
}

export default ReflectionArea;
