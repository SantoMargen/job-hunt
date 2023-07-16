const FormData = require("form-data");
const instanceImageKitApi = require("../apis/imagekitApis.js");
const SertifikasiPegawai = require("../models/sertifikasiPegawai.js")

const uploadImageKit = async (req, res, next) => {
    try {
        const maxSertifikation = await SertifikasiPegawai.findAll({ where: { Id_Pegawai: req.body.Id_Pegawai } })
        if (maxSertifikation.length === 3) throw { name: "MAX_SERTIFICATION" }

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
        const form = new FormData();
        const { originalname } = req.file;
        const DokumentasiSertifikat = req.file.buffer.toString("base64");

        form.append("fileName", originalname);
        form.append("file", DokumentasiSertifikat);
        const response = await instanceImageKitApi({
            url: "/files/upload",
            method: "POST",
            data: form,
            headers: { ...form.getHeaders() },
        });

        req.body.DokumentasiSertifikat = response.data.url;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = uploadImageKit;

