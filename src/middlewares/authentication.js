const { verifyToken } = require("../helpers/helpersToken.js")
const UserLogin = require("../models/userlogin.js")

const Authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: "UNAUTHENTICATED" };
        }
        const payload = verifyToken(access_token)
        const user = await UserLogin.findByPk(payload.Id_User)

        if (!user) throw { name: "AUTHENTICATION" };

        req.user = {
            Id_User: user.Id_User,
            Username: user.Username
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = Authentication