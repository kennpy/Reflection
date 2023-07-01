import React from "react";
const { PORT } = require("../backendConfig");
const FETCH_TEMPLATE_PATH = `http://localhost:${PORT}/templates`;

//TODO : Add setAudio prop to update audio component
const FetchTemplateButton = ({ setCaption }) => {
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

  function handleClick() {
    const template = fetch(FETCH_TEMPLATE_PATH, {})
      .then((data) => data.json())
      .then(async (template) => {
        console.log(template);
        // update audio and show elements on screen
        //updateAudio(template.audioFile);
        await iterateCaptions(template, setCaption);
        setCaption("Time to reflect ...");
      });
  }
  return <button onClick={handleClick}>Fetch Template</button>;
};

export default FetchTemplateButton;
