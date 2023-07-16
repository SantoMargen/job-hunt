const Bidang = require("../models/bidang.js")
const { validatorCreateBidang } = require("../validator/validator.js")
const { Sequelize } = require("../config/connection.js")
const Op = Sequelize.Op;
const { generateId, splitId } = require("../helpers/hepersId.js")

class ControllerBidang {
    static async createBidang(req, res, next) {
        try {
            const { NamaBidang } = req.body
            const payload = {
                Id_Bidang: generateId("B", 1, 1),
                NamaBidang: NamaBidang,
                Created_at: Date.now(),
            }

            const latestBidang = await Bidang.findOne({
                order: [['Id_Bidang', 'DESC']],
            });

            if (latestBidang) {
                let id = splitId(latestBidang.Id_Bidang)
                id++
                payload.Id_Bidang = generateId("B", id, 1)
            }
            const { error, value } = validatorCreateBidang.validate(payload)
            if (error) throw { name: "MAXIMUM_DATA" }

            const newRecord = await Bidang.create(value)

            res.status(201).json(newRecord)
        } catch (error) {
            next(error)
        }
    }

    static async getBidangById(req, res, next) {
        try {
            const { id } = req.params
            const bidangById = await Bidang.findByPk(id)

            if (!bidangById) throw { name: "NOTFOUND" }

            res.status(200).json(bidangById)
        } catch (error) {
            next(error)
        }
    }

    static async getAllBidang(req, res, next) {
        try {
            const allBidang = await Bidang.findAll()

            res.status(200).json(allBidang)
        } catch (error) {
            next(error)
        }
    }

    static async updateBidang(req, res, next) {
        try {
            const { NamaBidang } = req.body
            const { id } = req.params

            const bidang = await Bidang.findByPk(id)

            if (!bidang) throw { name: "NOTFOUND" }

            await Bidang.update({ NamaBidang }, {
                where: { Id_Bidang: id },
                returning: true
            })

            res.status(200).json({ message: "Bidang has been updated" })
        } catch (error) {
            throw error
        }
    }

    static async deleteBidang(req, res, next) {
        try {
            const { id } = req.params
            const bidang = await Bidang.findByPk(id)

            if (!bidang) throw { name: "NOTFOUND" }

            await Bidang.destroy({ where: { Id_Bidang: id } })

            res.status(200).json({ message: "Bidang has been deleted" })
        } catch (error) {
            throw error
        }
    }
}

module.exports = ControllerBidang