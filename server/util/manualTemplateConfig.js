const Template = require("../models/templateModel");
const connectDB = require("../db");

connectDB();

const DEFAULT_AUDIO_FILE_NAME = "DEFAULT";
const DEFAULT_LYRICS = [
  { lyric: "Some deep lyrics ...", duration: 2000 },
  { lyric: "More deep lyrics", duration: 1500 },
];

//person.friends.push(friend);

const defaultTemplate = new Template({
  audioFileName: [DEFAULT_AUDIO_FILE_NAME],
  lyrics: DEFAULT_LYRICS,
});

function makeDefaultTemplate() {
  console.log("Saving default template");

  defaultTemplate
    .save()
    .then((savedTemplate) => {
      console.log("User saved:", savedTemplate);
    })
    .catch((error) => {
      console.error("Error saving user:", error);
    });
}

function showAllTemplates() {
  console.log("Showing all templates");
  Template.find()
    .then((results) => {
      console.log(results); // Array of instances retrieved from the database
    })
    .catch((error) => {
      console.error(error); // Handle error
    });
}

async function getNumberTemplates() {
  const count = await Template.count().exec();
  console.log("Number of templates ", count);
}

async function generateRandomTemplate() {
  const numTemplates = await Template.count().exec();
  const randomSkipCount = Math.floor(Math.random() * numTemplates);
  let randomTemplate = await Template.findOne().skip(randomSkipCount);
  randomTemplate.audioFile = "";
  console.log("template in generate ", randomTemplate);
  return randomTemplate;
}

showAllTemplates();
//makeDefaultTemplate();
//getNumberTemplates();

module.exports = {
  generateRandomTemplate,
};
