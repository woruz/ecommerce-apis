const router = require("express").Router();
const validate = require("../../middleware/validate");
const controller = require("./auth.controller");
const {
  registerSchema,
  loginSchema,
} = require("./auth.schema");
      
router.post("/register", validate(registerSchema), controller.register);    
router.post("/login", validate(loginSchema), controller.login);

module.exports = router;
