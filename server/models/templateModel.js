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
        lyrics: String,
        duration: Number, // NOTE : duration is in ms
      },
    ],
    required: true,
  },
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
