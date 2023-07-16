const router = require('express').Router();
const BidangRoter = require("./bidangRouter.js")
const UserLoginRouter = require("./userLoginRouter.js")
const DataPegawaiRouter = require("./dataPegawaiRouter.js")
const ProvinciesRouter = require("./provinciesRoute.js")
const KotaRouter = require("./kotaRouter.js")
const SertifikasiRouter = require("./sertifikasiRouter.js")
const Authentication = require("../middlewares/authentication.js")


router.use("/user", UserLoginRouter)
router.use(Authentication)
router.use("/kota", KotaRouter)
router.use("/provincies", ProvinciesRouter)
router.use("/data", DataPegawaiRouter)
router.use("/bidang", BidangRoter)
router.use("/sertifikasi", SertifikasiRouter)


module.exports = router