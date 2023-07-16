const MsProvinsi = require("../models/provinsi")

class ControllerProvinsi {
    static async getAllProvinsi(req, res, next) {
        try {
            const provincies = await MsProvinsi.findAll()

            res.status(200).json(provincies)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerProvinsi