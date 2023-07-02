import React from "react";
const { PORT } = require("../backendConfig");
const FETCH_TEMPLATE_PATH = `http://localhost:${PORT}/templates`;

//TODO : Add setAudio prop to update audio component
const FetchTemplateButton = ({
  setCaption,
  setAudioSource,
  setSoundStatus,
  setStartingTime,
  makeNewAudio,
  setTemplateId,
}) => {
  async function iterateCaptions(template, setCaption) {
    for (const item of template.lyrics) {
      await setCaptionForDuration(item.lyric, item.duration, setCaption);
    }
  }

  function setCaptionForDuration(lyric, duration, setCaption) {
    return new Promise((resolve) => {
      setCaption(lyric);
      setTimeout(() => resolve(), duration);
    });
  }

  function getTotalCaptionTime(template) {
    let totalDuration = 0;
    for (let item of template.lyrics) {
      totalDuration += item.duration;
    }
    return totalDuration;
  }

  function handleClick() {
    const template = fetch(FETCH_TEMPLATE_PATH, {})
      .then((data) => data.json())
      .then(async (template) => {
        console.log(template);
        // update audio and show elements on screen
        //updateAudio(template.audioFile);
        //const audioAsBinary = window.atob(template.audioFile);
        const audioFilePrefix = "data:audio/mpeg;base64,";
        //setAudioSource(audioFilePrefix + template.audioFile);
        setTemplateId(template._id);
        setStartingTime(0);
        setSoundStatus(true);
        makeNewAudio(new Audio(audioFilePrefix + template.audioFile));
        const totalCaptionTime = getTotalCaptionTime(template);
        setTimeout(() => setSoundStatus(false), totalCaptionTime);
        await iterateCaptions(template, setCaption);
        setCaption("Time to reflect ...");
      });
  }
  return <button onClick={handleClick}>Fetch Template</button>;
};

export default FetchTemplateButton;
