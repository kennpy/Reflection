const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Answer = require("../models/answerModel");

router.post("/", saveAnswer);
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());

async function saveAnswer(req, res, next) {
  const body = req.body;
  console.log("BODY ", body);
  const answer = new Answer(body);
  await answer.save();
  const allAnswers = await Answer.find({ userId: req.body.userId });
  res.json(allAnswers);
}

module.exports = router;
