const router = require('express').Router();
const multer = require("multer");
const uploadImageKit = require("../middlewares/UploadFIle");
// const storage = multer.memoryStorage();  // UPLOAD IMAGE_KIT
const storage = multer.diskStorage({});  // UPLOAD CLOUDINARY
const upload = multer({ storage: storage });
const ControllerSertifikasi = require("../controllers/controllerSertifikasi.js")
const handleUpload  = require("../middlewares/uploadCloudinaryFile")

// // USE IMAGE KIT
// router.post("/pegawai",
//     upload.single("DokumentasiSertifikat"),
//     uploadImageKit, ControllerSertifikasi.createSertifikasi)

// USE CLOUDINARY
router.post("/pegawai",
    upload.single("file"),
    handleUpload, ControllerSertifikasi.createSertifikasi)




router.delete("/pegawai/:id", ControllerSertifikasi.deleteSertifikat)


module.exports = router