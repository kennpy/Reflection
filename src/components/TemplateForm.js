import React, { useEffect, useState } from "react";
const { PORT } = require("../backendConfig");
const FETCH_TEMPLATE_PATH = `http://localhost:${PORT}/templates`;

function TemplateForm() {
  const [mp3, setMp3] = useState();
  const [lyrics, setLyrics] = useState([]);
  const [singleLyric, setSingleLyric] = useState("");
  const [lyricDuration, setLyricDuration] = useState([]);
  const [fileName, setFileName] = useState("");

  function checkFormIsFilled() {
    console.log(mp3);
    return (
      lyricDuration !== "" &&
      singleLyric !== "" &&
      lyricDuration !== "" &&
      fileName !== ""
      //      mp3 !== ""
    );
  }

  async function handleSubmission(evt) {
    evt.preventDefault();
    const formIsFilled = checkFormIsFilled();
    console.log(formIsFilled);
    console.log(mp3);
    // if (formIsFilled) {
    //   // validate sign in info on backend and sign them in
    //   fetch(FETCH_LOGIN_PATH, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username,
    //       password,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((login) => {
    //       if (login.success) {
    //         console.log("LOGIN SUCCESS", login);
    //         setUserId(login.userId);
    //         setUserName(login.username);
    //       } else {
    //         console.log("LOGIN FAILURE");
    //       }
    //     });
    //   // else show invalid credentials
    // }
  }

  function addLyric(event) {
    event.preventDefault();
    setLyrics((oldLyrics) => [
      ...oldLyrics,
      { lyric: singleLyric, duration: lyricDuration },
    ]);
  }

  function handleFileChange(event) {
    const audioFile = event.target.files[0];
    if (checkFormIsFilled()) {
      console.log(audioFile);
      const formData = new FormData();
      formData.append("mp3", audioFile);
      formData.append("lyrics", JSON.stringify(lyrics));
      fetch(FETCH_TEMPLATE_PATH, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
    //setMp3(event.target.files[0]);
  }

  return (
    <div className="login-page">
      <h2>MAKE NEW FORM</h2>
      <form>
        <div>
          <label htmlFor="filename">File Name</label>
          <input
            value={fileName}
            placeholder="File Name"
            onChange={(e) => setFileName(e.target.value)}
            id="filename"
            name="filename"
            type="text"
            autoComplete="off"
            required
          />
        </div>

        <div>
          <label htmlFor="mp3">MP3</label>
          <input
            value={mp3}
            placeholder="MP3"
            onChange={handleFileChange}
            id="mp3"
            name="mp3"
            type="file"
            autoComplete="off"
            required
            accept="audio/mpeg3"
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="lyric">Caption</label>
          <input
            value={singleLyric}
            placeholder="Caption"
            onChange={(e) => setSingleLyric(e.target.value)}
            id="lyric"
            name="lyric"
            type="text"
            autoComplete="off"
            required
          />
          <input
            value={lyricDuration}
            placeholder="Lyric Duration"
            onChange={(e) => setLyricDuration(e.target.value)}
            id="lyricDuration"
            name="lyricDuration"
            type="text"
            autoComplete="off"
            required
          />
          <br></br>

          <button type="add-lyric-btn" onClick={addLyric}>
            Add Lyric
          </button>
        </div>
        <div>
          <br></br>

          <button type="submit" onClick={handleSubmission}>
            Make Template
          </button>
        </div>
      </form>
    </div>
  );
}

export default TemplateForm;
