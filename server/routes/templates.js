const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Template = require("../util/templateModel.js")


// get a template
router.get("/", getTemplate, sendTemplate);


function getTemplate(req, res, next){
    // get a template
    // NOTE : currently random, will add functionality for filtering later
    
}

function sendTemplate(req, res, next);

function makeTemplate(req, res, next)

export default router;
