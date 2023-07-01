import React, { useState } from "react";
import Prompt from "./Prompt";
import Audio from "./Audio";
import FetchTemplateButton from "./FetchTemplateButton";
import ReflectionTextEntry from "./ReflectionTextEntry";
import { AudioCaptions } from "./AudioCaptions";

function ReflectionArea() {
  // Get reflection info and pass it to components
  const [caption, setCaption] = useState("");

  return (
    <div className="reflectionArea">
      <FetchTemplateButton setCaption={setCaption} />
      <Prompt />
      <Audio />
      <AudioCaptions caption={caption} />
      <ReflectionTextEntry />
    </div>
  );
}

export default ReflectionArea;
