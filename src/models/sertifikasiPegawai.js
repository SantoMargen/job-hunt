'use strict';
const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require("../config/connection.js")
const DataPegawai = require("./dataPegawai.js")

class SertifikasiPegawai extends Model {
    static associate(models) {

    }
}

SertifikasiPegawai.init(
    {
        Id_Sertifikasi: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        Id_Pegawai: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        NamaLembaga: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Id_Bidang: {
            type: DataTypes.CHAR(2),
            allowNull: false,
        },
        DokumentasiSertifikat: {
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
        tableName: 'SertifikasiPegawai',
    }
)


module.exports = SertifikasiPegawai