const router = require('express').Router();
const ControllerUserLogin = require("../controllers/controllerUserLogin.js")

router.post("/register", ControllerUserLogin.registerUser)
router.post("/login", ControllerUserLogin.userLogin)


module.exports = router