'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Taxas', 'descricaoMoedaOrigem', {
        type: Sequelize.STRING
    });
    await queryInterface.addColumn('Taxas', 'descricaoMoedaDestino', {
        type: Sequelize.STRING
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Taxas', 'descricaoMoedaOrigem');
    await queryInterface.removeColumn('Taxas', 'descricaoMoedaDestino');
  }
};