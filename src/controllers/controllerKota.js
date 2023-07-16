const MsKota = require("../models/kota.js")
class ControllerKota {
    static async getAllKota(req, res, next) {
        try {
            const allKota = await MsKota.findAll()

            res.status(200).json(allKota)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerKota