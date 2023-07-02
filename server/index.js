const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const test = require("./db");
const templateRoutes = require("./routes/templates");
const userRoutes = require("./routes/users");
const answerRoutes = require("./routes/answers");

(async () => {
  const PORT = 3001;
  let DB_CONNECTION;

  DB_CONNECTION = await test.connectDB();
  console.log(typeof DB_CONNECTION);

  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const session = require("express-session");
  const MongoStore = require("connect-mongo");

  //   const sessionStore = new MongoStore({
  //     mongooseConnection: DB_CONNECTION,
  //   });

  app.use(
    session({
      store: MongoStore.create({ mongoUrl: test.DB_CONNECTION_URI }),
      collection: "sessions",
    })
  );

  app.use("/templates", templateRoutes);
  app.use("/answers", answerRoutes);
  //app.use("/users", userRoutes);

  app.get("/", (req, res) => {});

  app.listen(PORT, () => console.log("port runnin on ", PORT));
})();
