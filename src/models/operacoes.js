'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Operacoes extends Model {

    static associate(models) {
      Operacoes.belongsTo(models.Taxas, {
        foreignKey: 'taxaId',
      });
    }
  };
  Operacoes.init({
    cliente: { 
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Informe o nome do cliente" } 
      },
    },
    dataOperacao: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Informe a data da operação" }
      },
    },
    valorOriginal: { 
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Informe o valor original recebido para conversão" }
      },
    },
    valorConvertido: DataTypes.FLOAT,
    taxaCobrada: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Operacoes',
  });

  return Operacoes;
};