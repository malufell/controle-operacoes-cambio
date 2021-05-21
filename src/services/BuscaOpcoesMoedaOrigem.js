const database = require("../models");
const Sequelize = require("sequelize");

class BuscaOpcoesMoedaOrigemService {

  constructor() {
  }

  async call() {
      const taxasMoedaOrigem = await database.Taxas.findAll({
        attributes: [
          [Sequelize.fn("DISTINCT", Sequelize.col("moedaOrigem")), "moedaOrigem"],
          "descricaoMoedaOrigem",
        ],
        order: [["moedaOrigem", "DESC"]],
      });

    return taxasMoedaOrigem;
  };
};

module.exports = BuscaOpcoesMoedaOrigemService;