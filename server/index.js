const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const PORT = 3001;
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log("port runnin on ", PORT));
