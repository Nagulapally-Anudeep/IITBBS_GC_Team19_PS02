const express = require("express");
const userRouter = require("./routes/userRoutes");
const questionRouter = require("./routes/questionRoutes");

const app = express();

app.use(express.static(`${__dirname}/public`));

// routes
app.use("/users", userRouter);
app.use("/questions", questionRouter);

module.exports = app;
