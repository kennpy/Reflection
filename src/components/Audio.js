import React, { useState } from "react";

function AudioElement({ source, playSound, startingTime }) {
  const [audioStatusLabel, setAudioStatusLabel] = useState("");
  let audio = new Audio(source);
  audio.currentTime = startingTime;
  playSound ? play() : pause();

  function play() {
    audio.play();
    setAudioStatusLabel("Playing audio ...");
  }

  function pause() {
    audio.pause();
    setAudioStatusLabel("Pausing audio ...");
  }

  return (
    <>
      <p>{audioStatusLabel}</p>
      {/* <audio controls loop>
        <source src={audioData.src} type="audio/mp3" />
      </audio> */}
    </>
  );
}

export default AudioElement;
