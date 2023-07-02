const { FILE } = require("dns");
const express = require("express");
const router = express.Router();
const fs = require("fs");
let multer = require("multer");
let forms = multer();
const Template = require("../models/templateModel.js");
const { generateRandomTemplate } = require("../util/manualTemplateConfig");
const { getRandomAudioFile } = require("../util/soundUtils");

// get a template
router.get("/", getUserTemplate, getRandomTemplate, sendTemplate);

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
  const lyrics = JSON.parse(req.body.lyrics);
  const userId = req.body.userId;
  const file = req.files[0];

  console.log(lyrics);
  console.log(userId);
  const template = new Template({
    audioFileName: "./server/sounds/" + file.originalname,
    lyrics: lyrics,
    userId: userId,
  });

  const response = template.save();

  fs.writeFile(
    `./server/sounds/${file.originalname}`,
    file.buffer,
    { flag: "w" },
    (err) => {
      console.log(err);
    }
  );
  res.json(response);
});

async function getUserTemplate(req, res, next) {
  console.log("req.query.userId", req.query.userId);
  if (req.query.userId != undefined) {
    //  let template = await Template.findOne({ userId: req.query.userId });
    const numTemplates = await Template.count({
      userId: req.query.userId,
    }).exec();
    const randomSkipCount = Math.floor(Math.random() * numTemplates);
    let templates = await Template.find({ userId: req.query.userId });
    const template = templates[randomSkipCount];
    // .skip(
    //   randomSkipCount
    // );
    console.log(template, randomSkipCount);
    addAudioAndSend(template, res);
  } else {
    console.log("getting random template instead of user template");
    next();
  }
}

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
