'use strict';
const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require("../config/connection.js")
const SertifikasiPegawai = require("./sertifikasiPegawai.js")
class DataPegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

}

DataPegawai.init(
    {
        Id_Pegawai: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        NamaLengkap: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Tanggal: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Umur: {
            type: DataTypes.CHAR(3),
            allowNull: false,
        },
        AlamatLengkap: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Keahlian: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        LevelPekerjaan: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        Kd_Provinsi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Kd_KotaKabupaten: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Kodepos: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
    },
    {
        sequelize,
        timestamps: false,
        tableName: 'DataPegawai',
    }
)


DataPegawai.hasMany(SertifikasiPegawai, { as: "dataPegawai", foreignKey: "Id_Pegawai" })



module.exports = DataPegawai