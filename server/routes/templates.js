const express = require("express");
const router = express.Router();
const fs = require("fs");

const Template = require("../models/templateModel.js");
const { generateRandomTemplate } = require("../util/manualTemplateConfig");
const { getRandomAudioFile } = require("../util/soundUtils");

// get a template
router.get("/", getTemplate, sendTemplate);

async function getTemplate(req, res, next) {
  // get a template
  // NOTE : currently random, will add functionality for filtering later
  let randomTemplate = await generateRandomTemplate();
  const DEFAULT_AUDIO_FILE = getRandomAudioFile();
  fs.readFile(DEFAULT_AUDIO_FILE, (err, audio) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.sendStatus(500);
    }

    // Set response headers
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", 'attachment; filename="audio.mp3"');

    const base64AudioData = Buffer.from(audio).toString("base64");

    const response = {
      ...randomTemplate.toObject(),
      audioFile: base64AudioData,
    };

    res.json(response);
  });
}

function sendTemplate(req, res, next) {}

module.exports = router;
