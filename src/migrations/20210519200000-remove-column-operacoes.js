'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Operacoes', 'moedaOrigem', {
        type: Sequelize.STRING
    });
    await queryInterface.removeColumn('Operacoes', 'moedaDestino', {
        type: Sequelize.STRING
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Operacoes', 'moedaOrigem');
    await queryInterface.addColumn('Operacoes', 'moedaDestino');
  }
};