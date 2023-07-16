'use strict';
const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require("../config/connection.js")

class MsProvinsi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

MsProvinsi.init(
    {
        Kd_Provinsi: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        NamaProvinsi: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Kd_Region: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        Modified_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Delete_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        tableName: 'ms_provinsi',
    }
)


module.exports = MsProvinsi