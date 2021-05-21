'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      
    await queryInterface.bulkInsert('Taxas', [{
        moedaOrigem: 'USD',
        moedaDestino: 'EUR',
        taxa: 0.83,
        descricaoMoedaOrigem: 'Dólar Americano',
        descricaoMoedaDestino: 'Euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        moedaOrigem: 'USD',
        moedaDestino: 'BRL',
        taxa: 5.28,
        descricaoMoedaOrigem: 'Dólar Americano',
        descricaoMoedaDestino: 'Real Brasileiro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        moedaOrigem: 'EUR',
        moedaDestino: 'BRL',
        taxa: 6.37,
        descricaoMoedaOrigem: 'Euro',
        descricaoMoedaDestino: 'Real Brasileiro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        moedaOrigem: 'EUR',
        moedaDestino: 'USD',
        taxa: 1.20,
        descricaoMoedaOrigem: 'Euro',
        descricaoMoedaDestino: 'Dólar Americano',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        moedaOrigem: 'BRL',
        moedaDestino: 'EUR',
        taxa: 0.15,
        descricaoMoedaOrigem: 'Real Brasileiro',
        descricaoMoedaDestino: 'Euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        moedaOrigem: 'BRL',
        moedaDestino: 'USD',
        taxa: 0.18,
        descricaoMoedaOrigem: 'Real Brasileiro',
        descricaoMoedaDestino: 'Dólar Americano',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        moedaOrigem: 'BRL',
        moedaDestino: 'UYU',
        taxa: 8.31,
        descricaoMoedaOrigem: 'Real Brasileiro',
        descricaoMoedaDestino: 'Peso Uruguaio',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        moedaOrigem: 'UYU',
        moedaDestino: 'Real Brasileiro',
        taxa: 0.12,
        descricaoMoedaOrigem: 'Peso Uruguaio',
        descricaoMoedaDestino: 'Real Brasileiro',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Taxas', null, {});
  }
};
