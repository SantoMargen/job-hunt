const SertifikasiPegawai = require("../models/sertifikasiPegawai.js")
const { generateId, splitId } = require("../helpers/hepersId.js")
const { validateSertifikasi } = require("../validator/validator.js")

class ControllerSertifikasi {
    static async createSertifikasi(req, res, next) {
        try {
            const { Id_Pegawai, NamaLembaga, Id_Bidang, DokumentasiSertifikat } = req.body
            const maxSertifikation = await SertifikasiPegawai.findAll({ where: { Id_Pegawai } })
            if (maxSertifikation.length === 3) throw { name: "MAX_SERTIFICATION" }

            const payload = {
                Id_Sertifikasi: generateId("S", 1, 3),
                Id_Pegawai,
                NamaLembaga,
                Id_Bidang,
                DokumentasiSertifikat,
                Created_at: Date.now(),
            }

            const lastSertifikasi = await SertifikasiPegawai.findOne({
                order: [['Id_Sertifikasi', 'DESC']],
            })
            if (lastSertifikasi) {
                let id = splitId(lastSertifikasi.Id_Sertifikasi)
                id++
                payload.Id_Sertifikasi = generateId("S", id, 3)
            }

            const { error, value } = validateSertifikasi.validate(payload)
            if (error) throw { name: "VALIDATION_ERROR" }

            const newRecord = await SertifikasiPegawai.create(value)

            res.status(201).json(newRecord)
        } catch (error) {
            next(error)
        }
    }

    static async deleteSertifikat(req, res, next) {
        try {
            const { id } = req.params
            const dataSertifikat = await SertifikasiPegawai.findByPk(id)

            if (!dataSertifikat) throw { name: "NOTFOUND" }

            await SertifikasiPegawai.destroy({ where: { Id_Sertifikasi: id } })

            res.status(200).json({ messahe: "Data sertifikat has been deleted" })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = ControllerSertifikasi