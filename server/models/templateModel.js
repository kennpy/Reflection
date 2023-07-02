const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateSchema = new Schema({
  audioFileName: {
    type: [String],
    required: true,
  },
  lyrics: {
    type: [
      {
        lyric: String,
        duration: Number, // NOTE : duration is in ms
      },
    ],
    required: true,
  },
  userId: String,
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
