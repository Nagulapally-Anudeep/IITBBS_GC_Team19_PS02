const router = require("express").Router();
const userController = require("../controllers/userController");
const { ensureAuthenticated } = require("../middleware");

router.route('/:id').get(ensureAuthenticated, userController.getUser);
router.route('/:id').post(ensureAuthenticated, userController.whiteListUser);
router.route('/:id').post(ensureAuthenticated, userController.blackListUser);

module.exports = router;