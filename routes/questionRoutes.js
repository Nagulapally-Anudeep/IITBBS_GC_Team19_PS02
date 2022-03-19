const router = require("express").Router();
const questionController = require("../controllers/questionController");
const { ensureAuthenticated } = require("../middleware");

router.route('/').get(ensureAuthenticated, questionController.getAllQuestions);
module.exports = router;