require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRoutes");
const questionRouter = require("./routes/questionRoutes");
const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("passport");
const { ensureAuthenticated } = require("./middleware");
const app = express();

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", () => console.log("MongoDB connection error"));
db.once("open", () => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use("/questions", questionRouter);
app.use("/users", userRouter);


app.use(passport.initialize());
app.use(passport.session());

app.get("/error", (req, res) => res.send("error logging in"));
app.get("/", ensureAuthenticated, (req, res) => {
	res.render("index");
})

app.get("/login", (req, res) => {
	res.render("login");
})

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
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
      process.nextTick(() => {
        return done(null, userProfile);
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App listening on port " + port));
