const router = require('express').Router();
const ControllerDataPEgawai = require("../controllers/controllerDataPegawai.js")

router.post("/pegawai", ControllerDataPEgawai.createPegawai)
router.get("/pegawai", ControllerDataPEgawai.getAllPegawai)
router.get("/pegawai/:id", ControllerDataPEgawai.dataPegawaiById)
router.patch("/pegawai/:id", ControllerDataPEgawai.updateDataPegawai)
router.delete("/pegawai/:id", ControllerDataPEgawai.deleteDataPegawai)
router.get("/pegawai/sertifikat/:id", ControllerDataPEgawai.dataPegawaiSertifikat)

module.exports = router