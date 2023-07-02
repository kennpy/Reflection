import React, { useEffect, useState } from "react";

function AudioElement({ audio, source, playSound, startingTime }) {
  const [audioStatusLabel, setAudioStatusLabel] = useState("");
  console.log("Rendering AudioElement", playSound);
  useEffect(() => {
    console.log("useEffect being called in AudioElement", playSound);
    audio.currentTime = startingTime;
    playSound ? playAudio(audio) : pauseAudio(audio);
  }, [playSound]);

  function playAudio(audio) {
    audio.play();
    setAudioStatusLabel("Playing audio ...");
  }

  function pauseAudio(audio) {
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
