const cloudinary = require("../helpers/helperCloudinary")

const handleUpload = async(req, res, next)=>{
    try {
        console.log(req.file,"masuk =================");
        // const maxSertifikation = await SertifikasiPegawai.findAll({ where: { Id_Pegawai: req.body.Id_Pegawai } })
        // if (maxSertifikation.length === 3) throw { name: "MAX_SERTIFICATION" }
        if (req.file.size > 5242800) {
            throw { name: "IMAGE_SIZE_TO_BIG" };
        }
        if (
            req.file.mimetype !== "image/jpeg" &&
            req.file.mimetype !== "image/jpg" &&
            req.file.mimetype !== "image/png" &&
            req.file.mimetype !== "application/pdf"
        ) {
            throw { name: "InvalidFormat" };
        }
        
        const result = await cloudinary.uploader.upload(req.file.path);

        req.body.DokumentasiSertifikat = result.secure_url
        next()
    } catch (error) {
        console.log(error,"===========ERROR");
        next(error)
    }
}

module.exports = handleUpload