const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const test = require("./db");
const templateRoutes = require("./routes/templates");
const userRoutes = require("./routes/users");
const answerRoutes = require("./routes/answers");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/userModel");
(async () => {
  const PORT = 3001;
  let DB_CONNECTION;
  const SESSION_MINS = 30;

  DB_CONNECTION = await test.connectDB();
  console.log(typeof DB_CONNECTION);

  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // use static authenticate method of model in LocalStrategy
  //   passport.use(new LocalStrategy(User.authenticate()));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  passport.use(new LocalStrategy(User.authenticate()));

  const session = require("express-session");
  const MongoStore = require("connect-mongo");

  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/templates", templateRoutes);
  app.use("/answers", answerRoutes);
  app.use("/users", userRoutes);

  app.get("/", (req, res) => {});

  app.listen(PORT, () => console.log("port runnin on ", PORT));
})();
