'use strict';
const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require("../config/connection.js")

class MsKota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

MsKota.init(
    {
        Kd_Kota: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        Kd_Provinsi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        NamaKota: {
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
            allowNull: true,
        },
        Deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        tableName: 'ms_kota',
    }
)


module.exports = MsKota