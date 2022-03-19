const router = require("express").Router();
const userController = require("../controllers/userController");

router.route('/:id').get(userController.getUser);
router.route('/:id').get(userController.whiteListUser);
router.route('/:id').get(userController.blackListUser);

module.exports = router;