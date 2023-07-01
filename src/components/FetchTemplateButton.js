import React from "react";
const { PORT } = require("../backendConfig");
const FETCH_TEMPLATE_PATH = `http://localhost:${PORT}/templates`;

const FetchTemplateButton = () => {
  function handleClick() {
    fetch(FETCH_TEMPLATE_PATH, {})
      .then((template) => template.json())
      .then((template) => {
        console.log(template);
      });
  }
  return <button onClick={handleClick}>Fetch Template</button>;
};

export default FetchTemplateButton;
