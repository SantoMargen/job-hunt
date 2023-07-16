const UserLogin = require("../models/userlogin.js")
const { generateId, splitId } = require("../helpers/hepersId.js")
const { validatorUserLogin, validatorUsername } = require("../validator/validator.js")
const { Sequelize } = require("../config/connection.js")
const Op = Sequelize.Op;
const { hashPassword, comparePassword } = require("../helpers/bcrypt.js")
const { generateToken, verifyToken } = require("../helpers/helpersToken.js")


class ControllerUserLogin {
    static async registerUser(req, res, next) {
        try {
            const { Email, Username, Password } = req.body

            const findEmail = await UserLogin.findOne({
                where: {
                    [Op.or]: [
                        { Email },
                        { Username },
                    ],
                }
            })
            if (findEmail) throw { name: "EMAIL_ALREADY_EXIST" }

            let id = generateId("User", 1, 3)
            const validateUsername = validatorUsername.validate(Username);
            if (validateUsername.error) throw { name: "INVALID_USERNAME" }

            const lastUser = await UserLogin.findOne({
                order: [["Id_User", "DESC"]]
            })
            if (lastUser) {
                let lastId = splitId(lastUser.Id_User)
                lastId++
                id = generateId("User", lastId, 3)
            }
            const dataToken = {
                Id_User: id,
                Username: Username
            }

            const token = generateToken(dataToken)
            const payload = {
                Id_User: id,
                Email: Email,
                Username: Username,
                Password: Password,
                Token: token,
                Created_at: Date.now(),
            }

            const { error, value } = validatorUserLogin.validate(payload)
            if (error) throw { name: "VALIDATION_ERROR" }

            value.Password = hashPassword(payload.Password)

            const newRecord = await UserLogin.create(value)
            const response = {
                Id_User: newRecord.Id_User,
                Email: newRecord.Email,
                Username: newRecord.Username,
                Token: newRecord.Token
            }
            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async userLogin(req, res, next) {
        try {
            const { Email, Password } = req.body
            if (!Email) {
                throw { name: "EMAIL_REQUIRED" };
            }
            if (!Password) {
                throw { name: "PASSWORD_REQUIRED" };
            }

            const user = await UserLogin.findOne({
                where: { Email },
            });

            if (!user || !comparePassword(Password, user.Password)) {
                throw { name: "USER_NOT_FOUND" };
            }

            res.status(200).json({ access_token: user.Token })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerUserLogin