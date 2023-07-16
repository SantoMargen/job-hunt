const { Sequelize } = require("../config/connection.js")
const Op = Sequelize.Op;
const DataPegawai = require("../models/dataPegawai.js")
const { generateId, splitId } = require("../helpers/hepersId.js")
const calculateAge = require("../helpers/calculateAge.js")
const { ValidateDataPegawai } = require("../validator/validator.js")
const SertifikasiPegawai = require("../models/sertifikasiPegawai.js")


class ControllerDataPEgawai {
    static async createPegawai(req, res, next) {
        try {
            const { NamaLengkap, Tanggal, AlamatLengkap, Keahlian,
                LevelPekerjaan, Kd_Provinsi, Kd_KotaKabupaten, Kodepos } = req.body

            const existingUser = await DataPegawai.findOne({ where: { NamaLengkap } });
            if (existingUser) throw { name: "NAME_ALREADY_EXIST" }

            if (LevelPekerjaan) {
                const arrLevel = LevelPekerjaan.split(";")
                if (arrLevel.length > 1) throw { name: "TO_MUCH_LEVEL" }
            }

            const umur = calculateAge(Tanggal)
            const [day, month, year] = Tanggal.split('/');


            const isoDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(
                2,
                '0'
            )}`;

            const payload = {
                Id_Pegawai: generateId("P", 1, 4),
                NamaLengkap,
                Tanggal: isoDateString,
                Umur: String(umur),
                AlamatLengkap,
                Keahlian,
                LevelPekerjaan,
                Kd_Provinsi,
                Kd_KotaKabupaten,
                Kodepos,
                Created_at: Date.now(),
            }
            const lastDataPegawai = await DataPegawai.findOne({
                order: [['Id_Pegawai', 'DESC']],
            })

            if (lastDataPegawai) {
                let id = splitId(lastDataPegawai.Id_Pegawai)
                id++
                payload.Id_Pegawai = generateId("P", id, 4)
            }

            const { error, value } = ValidateDataPegawai.validate(payload)
            if (error) throw { name: "VALIDATION_ERROR" }

            const newRecord = await DataPegawai.create(value)

            res.status(201).json(newRecord)
        } catch (error) {
            next(error)
        }
    }

    static async getAllPegawai(req, res, next) {
        try {
            const allData = await DataPegawai.findAll()

            res.status(200).json(allData)
        } catch (error) {
            next(error)
        }
    }

    static async dataPegawaiById(req, res, next) {
        try {
            const { id } = req.params
            const dataPegawai = await DataPegawai.findByPk(id)

            if (!dataPegawai) throw { name: "NOTFOUND" }

            res.status(200).json(dataPegawai)
        } catch (error) {
            next(error)
        }
    }

    static async updateDataPegawai(req, res, next) {
        try {
            const { id } = req.params
            const input = req.body
            if (input.LevelPekerjaan) {
                const arrLevel = input.LevelPekerjaan.split(";")
                if (arrLevel.length > 1) throw { name: "TO_MUCH_LEVEL" }
            }
            const dataPegawai = await DataPegawai.findByPk(id)

            if (!dataPegawai) throw { name: "NOTFOUND" }

            const payload = {}
            payload.NamaLengkap = input.NamaLengkap ? input.NamaLengkap : dataPegawai.NamaLengkap
            if (input.Tanggal) {
                const [day, month, year] = input.Tanggal.split('/');


                const isoDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(
                    2,
                    '0'
                )}`;
                payload.Tanggal = isoDateString ? isoDateString : dataPegawai.Tanggal
            }
            payload.Umur = input.Tanggal ? calculateAge(input.Tanggal) : dataPegawai.umur
            payload.AlamatLengkap = input.AlamatLengkap ? input.AlamatLengkap : dataPegawai.AlamatLengkap
            payload.Keahlian = input.Keahlian ? input.Keahlian : dataPegawai.Keahlian
            payload.LevelPekerjaan = input.LevelPekerjaan ? input.LevelPekerjaan : dataPegawai.LevelPekerjaan
            payload.Kd_Provinsi = input.Kd_Provinsi ? input.Kd_Provinsi : dataPegawai.Kd_Provinsi
            payload.Kd_KotaKabupaten = input.Kd_KotaKabupaten ? input.Kd_KotaKabupaten : dataPegawai.Kd_KotaKabupaten
            payload.Kodepos = input.Kodepos ? input.Kodepos : dataPegawai.Kodepos
            payload.NamaLengkap = input.NamaLengkap ? input.NamaLengkap : dataPegawai.NamaLengkap

            await DataPegawai.update(payload, {
                where: { Id_Pegawai: id },
                returning: true
            })

            res.status(200).json({ message: "Data pegawai has been updated" })
        } catch (error) {
            next(error)
        }
    }

    static async deleteDataPegawai(req, res, next) {
        try {
            const { id } = req.params
            const dataPegawai = await DataPegawai.findByPk(id)
            if (!dataPegawai) throw { name: "NOTFOUND" }

            await DataPegawai.destroy({
                where: { Id_Pegawai: id }, returning: true
            })

            res.status(200).json({ message: "Data Pegawai has been deleted" })
        } catch (error) {
            next(error)
        }
    }

    static async dataPegawaiSertifikat(req, res, next) {
        try {
            const { id } = req.params
            const data = await DataPegawai.findByPk(id, {
                include: ["dataPegawai"]
            })

            if (!data) throw { name: "NOTFOUND" }

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerDataPEgawai