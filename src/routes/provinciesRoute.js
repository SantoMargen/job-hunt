const router = require('express').Router();
const ControllerProvinsi = require("../controllers/controllerProvinsi.js")

router.get("/", ControllerProvinsi.getAllProvinsi)


module.exports = router