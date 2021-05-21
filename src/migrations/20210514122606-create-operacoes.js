'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Operacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cliente: {
        type: Sequelize.STRING
      },
      moedaOrigem: {
        type: Sequelize.STRING
      },
      moedaDestino: {
        type: Sequelize.STRING
      },
      dataOperacao: {
        type: Sequelize.DATEONLY
      },
      valorOriginal: {
        type: Sequelize.FLOAT
      },
      valorConvertido: {
        type: Sequelize.FLOAT
      },
      taxaCobrada: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Operacoes');
  }
};