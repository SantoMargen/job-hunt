const router = require('express').Router();
const ControllerKota = require("../controllers/controllerKota.js")

router.get("/", ControllerKota.getAllKota)

module.exports = router