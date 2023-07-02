import React, { useState } from "react";

import Prompt from "./Prompt";
import AudioElement from "./Audio";
import SideBar from "./SideBar";

import FetchTemplateButton from "./FetchTemplateButton";
import ReflectionTextEntry from "./ReflectionTextEntry";
import { AudioCaptions } from "./AudioCaptions";
import UserContext from "../context/UserContext";

const { PORT } = require("../backendConfig");
const ANSWERS_API_PATH = `http://localhost:${PORT}/answers`;

function noop() {}

function ReflectionArea({ setUserAnswers, userAnswers }) {
  // Get reflection info and pass it to components
  const [caption, setCaption] = useState("");
  const [soundStatus, setSoundStatus] = useState(false);
  const [startingTime, setStartingTime] = useState(0);
  const [audioSource, setAudioSource] = useState("/DEFAULT.mp3");
  const [audio, makeNewAudio] = useState({ play: noop, pause: noop });
  const [templateId, setTemplateId] = useState("");
  const userId = React.useContext(UserContext);

  async function submitReflection(text) {
    await fetch(ANSWERS_API_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        templateId,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((everyUserAnswer) => {
        console.log("answers we are updating sidebar with ");
        console.log(everyUserAnswer);
        setUserAnswers(everyUserAnswer);
      });
  }

  return (
    <div className="reflectionArea">
      <SideBar
        userAnswers={userAnswers}
        setCaption={setCaption}
        setAudioSource={setAudioSource}
        setSoundStatus={setSoundStatus}
        setStartingTime={setStartingTime}
        makeNewAudio={makeNewAudio}
        setTemplateId={setTemplateId}
      />
      <FetchTemplateButton
        setCaption={setCaption}
        setAudioSource={setAudioSource}
        setSoundStatus={setSoundStatus}
        setStartingTime={setStartingTime}
        makeNewAudio={makeNewAudio}
        setTemplateId={setTemplateId}
      />
      <Prompt />
      <AudioElement
        source={audioSource}
        playSound={soundStatus}
        startingTime={startingTime}
        audio={audio}
      />
      <AudioCaptions caption={caption} />
      <ReflectionTextEntry submitReflection={submitReflection} />
    </div>
  );
}

export default ReflectionArea;
