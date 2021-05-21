'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Operacoes', 'taxaId', {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Taxas', key: 'id'}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Operacoes', 'taxaId');
  }
};

