'use strict';
const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require("../config/connection.js")

class Bidang extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}

Bidang.init(
  {
    Id_Bidang: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    NamaBidang: {
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
    tableName: 'Bidang',
  }
);

module.exports = Bidang