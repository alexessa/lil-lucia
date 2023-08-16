const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersController.getUsers);

router.get("/:uid", usersController.getUserProfile);

router.post(
  "/signup",
  [
    check("FirstName").not().isEmpty(),
    check("LastName").not().isEmpty(),
    check("Address").not().isEmpty(),
    check("Email").normalizeEmail().isEmail(),
    check("Password").isLength({ min: 8 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.patch(":uid", usersController.updateUserProfile);

module.exports = router;
