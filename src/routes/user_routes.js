const router = require('express').Router();
const userController = require('../controllers/user_controller.js')

router.post("/", userController.create_user);

router.get("/", userController.get_all_users);

router.get("/:id", userController.get_user);

router.put("/:id", userController.put_user);

router.delete("/:id", userController.delete_user);

module.exports = router;