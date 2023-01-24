const Router = require("express");
const router = Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require("./midleware/authMiddleware");
const roleMiddleware = require("./midleware/roleMiddleware");

router.post(
  "/registration",
  [
    check("username", "Name can't be empty").notEmpty(),
    check("password", "Length must be 4-10").isLength({ max: 10, min: 4 }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get(
  "/user",
  //   authMiddleware,
  roleMiddleware("USER"),
  controller.getUsers
);

module.exports = router;
