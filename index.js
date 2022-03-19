const express = require("express");
const userRouter = require("./routes/userRoutes");
const questionRouter = require("./routes/questionRoutes");

const app = express();
const session = require("express-session");
app.set("view engine", "ejs");
app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: "secret"
}));

app.get("/", (req, res) => {
	
});

app.use(express.static(`${__dirname}/public`));

// routes
app.use("/users", userRouter);
app.use("/questions", questionRouter);

module.exports = app;
