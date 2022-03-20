const router = require("express").Router();
const answerController = require("../controllers/answerController");
const { ensureAuthenticated } = require("../middleware");

// router.route("/").get(ensureAuthenticated, questionController.getAllQuestions);
// router.route("/").get((req, res, next) => {
//   console.log(req.user);
//   res.send("Hello world");
// });

router.post("/", answerController.createAnswer);

module.exports = router;
