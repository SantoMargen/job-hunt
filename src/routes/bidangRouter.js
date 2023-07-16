const router = require('express').Router();
const ControllerBidang = require("../controllers/controllerBidang.js")

router.post("/", ControllerBidang.createBidang)
router.get("/:id", ControllerBidang.getBidangById)
router.get("/", ControllerBidang.getAllBidang)
router.patch("/:id", ControllerBidang.updateBidang)
router.delete("/:id", ControllerBidang.deleteBidang)

module.exports = router