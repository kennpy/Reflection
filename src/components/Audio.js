import { useEffect } from "react";

function Audio() {
  return (
    <>
      <audio controls autoPlay>
        <source src="public/mixkit-tech-house-vibes-130.mp3" type="audio/mp3" />
      </audio>
    </>
  );
}

export default Audio;
