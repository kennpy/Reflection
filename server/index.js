const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const connectDB = require("./db");
const templateRoutes = require("./routes/templates");
const userRoutes = require("./routes/users");
const answerRoutes = require("./routes/answers");

const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use("/templates", templateRoutes);
//app.use("/users", userRoutes);
//app.use("/answers", answerRoutes);

app.get("/", (req, res) => {});

connectDB();

app.listen(PORT, () => console.log("port runnin on ", PORT));
