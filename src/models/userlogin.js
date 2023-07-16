'use strict';
const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require("../config/connection.js")

class UserLogin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

UserLogin.init(
    {
        Id_User: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        Modified_at: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        timestamps: false,
        tableName: 'UserLogin',
    }
)

module.exports = UserLogin