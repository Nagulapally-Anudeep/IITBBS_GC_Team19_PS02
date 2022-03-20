const router = require("express").Router();
const questionController = require("../controllers/questionController");
const { ensureAuthenticated } = require("../middleware");

// router.route("/").get(ensureAuthenticated, questionController.getAllQuestions);
// router.route("/").get((req, res, next) => {
//   console.log(req.user);
//   res.send("Hello world");
// });

router.post("/", questionController.createQuestion);
router.post("/upvote/:id", questionController.upVoteQuestion);

// router.route("/:id").get(questionController.getQuestion);

module.exports = router;
