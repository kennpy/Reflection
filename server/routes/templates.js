const express = require("express");
const router = express.Router();
const fs = require("fs");
let multer = require("multer");
let forms = multer();
const Template = require("../models/templateModel.js");
const { generateRandomTemplate } = require("../util/manualTemplateConfig");
const { getRandomAudioFile } = require("../util/soundUtils");

// get a template
router.get("/", getRandomTemplate, sendTemplate);

router.get("/:id", async (req, res, next) => {
  const templateId = req.params.id;
  console.log("/:id GET - ", req.params.id);
  const template = await makeTemplateById(req, res, next, templateId);
  addAudioAndSend(template, res);
});

// const files = multer().fields([{ mp3: "mp3" }, { lyrics: "lyrics" }]);
const files = multer().any();

router.post("/", files, (req, res, next) => {
  console.log("POST /templates", req.body, req.files);
  res.json({});
});

async function makeTemplateById(req, res, next, templateId) {
  const template = await Template.findById(templateId);
  console.log(template);
  return template;
}

async function getRandomTemplate(req, res, next) {
  // get a template
  // NOTE : currently random, will add functionality for filtering later
  //'const DEFAULT_AUDIO_FILE = getRandomAudioFile();
  let randomTemplate = await generateRandomTemplate();
  addAudioAndSend(randomTemplate, res);
}

function addAudioAndSend(randomTemplate, res) {
  const lastNameIdx = randomTemplate.audioFileName.length - 1;
  fs.readFile(randomTemplate.audioFileName[lastNameIdx], (err, audio) => {
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
