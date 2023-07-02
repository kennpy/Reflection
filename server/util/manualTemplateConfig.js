const Template = require("../models/templateModel");
const test = require("../db");
const getRandomAudioFile = require("./soundUtils");

test.connectDB();

const DEFAULT_AUDIO_FILE_NAME = "DEFAULT";
const DEFAULT_LYRICS = [
  { lyric: "Some deep lyrics ...", duration: 4000 },
  { lyric: "More deep lyrics", duration: 1500 },
];

//person.friends.push(friend);

function makeDefaultTemplate() {
  console.log("Saving default template");
  const fileName = getRandomAudioFile();
  const defaultTemplate = new Template({
    audioFileName: [fileName],
    lyrics: DEFAULT_LYRICS,
  });
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
  console.log("template in generate ", randomTemplate);
  return randomTemplate;
}

async function deleteAllTemplates() {
  const count = await Template.deleteMany({});
  console.log("Number of deleted templates ", count);
}

//deleteAllTemplates();
//getNumberTemplates();
//makeDefaultTemplate();
//showAllTemplates();

module.exports = {
  generateRandomTemplate,
};
