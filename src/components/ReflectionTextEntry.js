import React, { useState } from "react";

function ReflectionTextEntry({ submitReflection }) {
  const [textValue, updateTextValue] = useState("");
  const handleChange = (event) => {
    updateTextValue(event.target.value);
  };
  return (
    <>
      <textarea
        type="text"
        rows="5"
        className="reflectionTextEntry"
        onChange={handleChange}
      ></textarea>

      <button
        type="submit"
        className="reflectionSubmitButton"
        onClick={() => submitReflection(textValue)}
      >
        Submit
      </button>
    </>
  );
}

export default ReflectionTextEntry;
