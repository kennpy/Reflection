const User = require("../models/userModel");
const test = require("../db");

test.connectDB();

function showAllUsers() {
  console.log("Showing all templates");
  User.find()
    .then((results) => {
      console.log(results); // Array of instances retrieved from the database
    })
    .catch((error) => {
      console.error(error); // Handle error
    });
}
async function deleteAllUsers() {
  const count = await User.deleteMany({});
  console.log("Number of deleted templates ", count);
}

//deleteAllUsers();
showAllUsers();
