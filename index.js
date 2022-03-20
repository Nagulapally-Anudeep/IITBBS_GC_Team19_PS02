require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRoutes");
const questionRouter = require("./routes/questionRoutes");
const answerRouter = require("./routes/answerRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Answer = require("./models/answerModel");
const Question = require("./models/questionModel");
const User = require("./models/userModel");

const session = require("express-session");
const passport = require("passport");
const { ensureAuthenticated } = require("./middleware");
const app = express();

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", () => console.log("MongoDB connection error"));
db.once("open", () => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
app.use(express.json());

app.use("/questions", questionRouter);
app.use("/users", userRouter);
app.use("/answers", answerRouter);

app.use(passport.initialize());
app.use(passport.session());

app.get("/error", (req, res) => res.send("error logging in"));
app.get("/", ensureAuthenticated, async (req, res) => {
  console.log(req.user);
  const questions = await Question.find();
  res.render("home", { questions: questions, user: req.user });
});

app.get("/question/:id", async (req, res) => {
  const question = await Question.findById(req.params.id);
  const ansIDs = question.answerIDs;

  let answersPromises = ansIDs.map((ele) => {
    const answer = Answer.findById(ele);
    return answer;
  });

  const answers = await Promise.all(answersPromises);
  // let answers = [];
  // ansIDs.forEach(async function (itemID) {
  //   const answer = await Answer.findById(itemID);
  //   answers.push(answer);
  // });

  // console.log(answers, "\n\n", answersPromises);

  res.render("forum", {
    user: req.user,
    question: question,
    answers: answers,
  });
});

// app.post("/test", async (req, res) => {
//   const questionContent = req.body.postContent;
//   const createdUser = req.user._id;

//   console.log(req.body);

//   const question = {
//     questionContent: questionContent,
//     createdBy: createdUser,
//     createdAt: Date.now(),
//   };

//   console.log(question);
// });

app.get("/login", (req, res) => {
  res.render("login");
});

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      let userProfile = profile;
      process.nextTick(async () => {
        const email = userProfile.emails[0].value;
        const user = await User.findOne({ email });
        if (user) {
          return done(null, user);
        }
        const newUser = new User({
          name: userProfile.displayName,
          email: userProfile.emails[0].value,
          profilePicture: userProfile.photos[0].value,
        });
        await newUser.save();
        return done(null, newUser);
      });
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/error",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App listening on port " + port));
