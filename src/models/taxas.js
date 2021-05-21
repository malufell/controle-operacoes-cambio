"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Taxas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Taxas.hasMany(models.Operacoes, {
        foreignKey: "taxaId",
      });
    }
  }
  Taxas.init(
    {
      moedaOrigem: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Selecione a moeda de origem",
          },
        },
      },
      moedaDestino: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Selecione a moeda de destino",
          },
        },
      },
      taxa: { 
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Informe a taxa de conversão",
          },
        },
      },
      descricaoMoedaOrigem: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Selecione a moeda de origem",
          },
        },
      },
      descricaoMoedaDestino: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Selecione a moeda de destino",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Taxas",
    }
  );
  return Taxas;
};
