const express = require("express");
const { signup, signin } = require("../controllers/auth");
const { userValidationRules, validate, loginValidationRules } = require("../middleware/validator");

const router = express.Router();

router.post("/signup", userValidationRules(), validate, signup);
router.post("/signin", loginValidationRules(), validate, signin);

module.exports = router;
