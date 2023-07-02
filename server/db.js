const mongoose = require("mongoose");
const DB_CONNECTION_URI = "mongodb://localhost/reflection";

const connectDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await mongoose.connect(DB_CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
      resolve(connection);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      reject("db connection failed");
    }
  });
};

module.exports = {
  connectDB,
  DB_CONNECTION_URI,
};
