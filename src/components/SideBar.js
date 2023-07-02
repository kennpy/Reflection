import React from "react";
const { PORT } = require("../backendConfig");
const FETCH_TEMPLATE_PATH = `http://localhost:${PORT}/templates`;

function SideBar({
  userAnswers,
  setCaption,
  setAudioSource,
  setSoundStatus,
  setStartingTime,
  makeNewAudio,
  setTemplateId,
}) {
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
  async function startAudio(template) {
    const audioFilePrefix = "data:audio/mpeg;base64,";
    //setAudioSource(audioFilePrefix + template.audioFile);
    console.log("starting audio from side bar click", setTemplateId);
    setTemplateId(template._id);
    setStartingTime(0);
    setSoundStatus(true);
    makeNewAudio(new Audio(audioFilePrefix + template.audioFile));
    const totalCaptionTime = getTotalCaptionTime(template);
    setTimeout(() => setSoundStatus(false), totalCaptionTime);
    await iterateCaptions(template, setCaption);
    setCaption("Time to reflect ...");
  }

  function handleClick(event) {
    const list = event.target.parentElement;
    const requestUrl = FETCH_TEMPLATE_PATH + "/" + list.dataset.templateId;
    console.log("url for get request : ", requestUrl);
    const template = fetch(requestUrl, {})
      .then((data) => data.json())
      .then((template) => {
        console.log(template);
        startAudio(template);
      });
  }

  const listItems =
    userAnswers &&
    userAnswers.map((answer) => (
      <li
        key={answer._id}
        data-template-id={answer.templateId}
        data-answer-id={answer._id}
      >
        <p>{answer.text}</p>
      </li>
    ));
  return <ul onClick={handleClick}>{listItems}</ul>;
}

export default SideBar;
