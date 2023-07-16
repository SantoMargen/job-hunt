const router = require('express').Router();
const multer = require("multer");
const uploadImageKit = require("../middlewares/UploadFIle");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const ControllerSertifikasi = require("../controllers/controllerSertifikasi.js")


router.post("/pegawai",
    upload.single("DokumentasiSertifikat"),
    uploadImageKit, ControllerSertifikasi.createSertifikasi)

router.delete("/pegawai/:id", ControllerSertifikasi.deleteSertifikat)


module.exports = router