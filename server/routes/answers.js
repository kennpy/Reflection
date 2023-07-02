const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.post("/", saveAnswer);
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());

function saveAnswer(req, res, next) {
  const body = req.body;
  console.log("BODY ", body);
  res.json(body);
}

module.exports = router;
