const { check, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    check("username")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Username is required"),
    check("email").trim().isEmail().withMessage("Invalid email format"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .bail() // stop running validators on this field if this one fails
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter")
      .bail()
      .matches(/[a-z]/)
      .withMessage("Password must contain a lowercase letter")
      .bail()
      .matches(/\d/)
      .withMessage("Password must contain a number")
      .bail()
      .matches(/[@$!%*?&]/)
      .withMessage("Password must contain a special character"),
  ];
};

const loginValidationRules = () => {
  return [
    check("email").trim().isEmail().withMessage("Invalid email format"),
    check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is required"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = {};
  errors.array().forEach((err) => {
    extractedErrors[err.param] = err.msg;
  });

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  loginValidationRules,
  validate,
};
