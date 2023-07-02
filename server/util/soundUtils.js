const DEFAULT_AUDIO_PATH = "./server/sounds/";
const DEFAULT_AUDIO_NAMES = ["DEFAULT1", "DEFAULT2", "DEFAULT3"];
const DEFAULT_AUDIO_TYPE = ".mp3";
const DEFAULT_AUDIO_FADEOUT = 3;

function getRandomAudioFile() {
  const DEFAULT_AUDIO_FILE =
    DEFAULT_AUDIO_PATH +
    DEFAULT_AUDIO_NAMES[
      Math.floor(Math.random() * DEFAULT_AUDIO_NAMES.length)
    ] +
    DEFAULT_AUDIO_TYPE;

  return DEFAULT_AUDIO_FILE;
}

function fadeOutAudio(audioElement, fadeOutTime = DEFAULT_AUDIO_FADEOUT) {}

module.exports = getRandomAudioFile;
